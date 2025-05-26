import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define toaster types
export type ToasterType = 'success' | 'error' | 'info' | 'warning';

// Define toaster interface
export interface Toaster {
  id: string;
  type: ToasterType;
  title: string;
  message: string;
  duration: number;
  visible: boolean;
  isPaused?: boolean;
  remainingTime?: number;
  timeoutId?: any;
  startTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private defaultDuration = 5;

  private toastersSubject = new BehaviorSubject<Toaster[]>([]);
  public toasters$: Observable<Toaster[]> = this.toastersSubject.asObservable();

  constructor() { }

  get toasters(): Toaster[] {
    return this.toastersSubject.getValue();
  }
  addToaster(type: ToasterType, title: string, message: string, duration?: number) {
    const toasterId = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const toasterDuration = duration || this.defaultDuration;
    
    const toaster: Toaster = { 
      id: toasterId, 
      type, 
      title, 
      message, 
      duration: toasterDuration, 
      visible: true,
      isPaused: false,
      startTime: Date.now()
    };
    
    const currentToasters = this.toasters;
    currentToasters.push(toaster);
    this.toastersSubject.next(currentToasters);
    
    toaster.timeoutId = setTimeout(() => {
      this.removeToaster(toasterId);
    }, toasterDuration * 1000);
    
    return toasterId;
  }

  removeToaster(id: string) {
    const toaster = this.toasters.find(t => t.id === id);
    if (toaster && toaster.timeoutId) {
      clearTimeout(toaster.timeoutId);
    }
    
    const updatedToasters = this.toasters.filter(t => t.id !== id);
    this.toastersSubject.next(updatedToasters);
  }

  pauseToaster(id: string) {
    const toaster = this.toasters.find(t => t.id === id);
    if (toaster && !toaster.isPaused) {
      if (toaster.timeoutId) {
        clearTimeout(toaster.timeoutId);
        toaster.timeoutId = null;
      }
      
      const elapsedTime = (Date.now() - (toaster.startTime || 0)) / 1000;
      toaster.remainingTime = toaster.duration - elapsedTime;
      
      toaster.isPaused = true;
      
      this.toastersSubject.next([...this.toasters]);
    }
  }

  resumeToaster(id: string) {
    const toaster = this.toasters.find(t => t.id === id);
    if (toaster && toaster.isPaused) {
      const remainingTimeMs = (toaster.remainingTime || 0) * 1000;
      if (remainingTimeMs > 0) {
        toaster.timeoutId = setTimeout(() => {
          this.removeToaster(id);
        }, remainingTimeMs);
      } else {
        this.removeToaster(id);
        return;
      }
      
      toaster.startTime = Date.now();
      
      toaster.isPaused = false;
      
      this.toastersSubject.next([...this.toasters]);
    }
  }

  showSuccess(message: string, title: string = 'Success', duration?: number) {
    return this.addToaster('success', title, message, duration);
  }

  showError(message: string, title: string = 'Error', duration?: number) {
    return this.addToaster('error', title, message, duration);
  }

  showInfo(message: string, title: string = 'Information', duration?: number) {
    return this.addToaster('info', title, message, duration);
  }

  showWarning(message: string, title: string = 'Warning', duration?: number) {
    return this.addToaster('warning', title, message, duration);
  }
}

