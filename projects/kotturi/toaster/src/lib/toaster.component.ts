import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToasterService, ToasterType, Toaster } from './toaster.service';

@Component({
  selector: 'lib-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit, OnDestroy {
  @Input() toasterPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'bottom-left';
  @Input() themeService: 'dark' | 'light' = 'dark';

  // Array of toaster notifications
  toasters: Toaster[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toasterService: ToasterService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Subscribe to toasters from the service
    this.subscription.add(
      this.toasterService.toasters$.subscribe(toasters => {
        this.toasters = toasters;
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  // Public method to show a toaster with the current input values
  showToaster() {
    // Removed this method implementation as it was using undefined variables
  }

  // Method to remove a toaster by ID
  removeToaster(id: string) {
    this.toasterService.removeToaster(id);
  }

  // Method to pause a toaster's progress bar on hover
  pauseToaster(id: string) {
    this.toasterService.pauseToaster(id);
  }

  // Method to resume a toaster's progress bar on mouse leave
  resumeToaster(id: string) {
    this.toasterService.resumeToaster(id);
  }

  // Get CSS class for toaster based on type
  getToasterClass(type: ToasterType): string {
    switch (type) {
      case 'success':
        return 'green-taster';
      case 'error':
        return 'red-taster';
      case 'info':
        return 'info-taster';
      case 'warning':
        return 'warn-taster';
      default:
        return 'green-taster';
    }
  }

  // Get icon class for toaster based on type
  getIconClass(type: ToasterType): string {
    switch (type) {
      case 'success':
        return 'success-svg';
      case 'error':
        return 'error-svg';
      case 'info':
        return 'info-svg';
      case 'warning':
        return 'warn-svg';
      default:
        return 'success-svg';
    }
  }

  // Get progress bar color based on type
  getProgressBarColor(type: ToasterType): string {
    switch (type) {
      case 'success':
        return '#397d54';
      case 'error':
        return '#a72f1d';
      case 'info':
        return '#88cdf6';
      case 'warning':
        return '#ffed00';
      default:
        return '#397d54';
    }
  }
}
