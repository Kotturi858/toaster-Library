import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ToasterModule,
  ToasterService,
  AnimationType
} from '../../../kotturi/toaster/src/public-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToasterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kotturi Toaster Library Demo';
  duration = 5;
  message = 'The msg is displayed here.';
  toastTitle = 'Toast Title';
  toasterPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'bottom-left';
  // In your component
  currentTheme: 'light' | 'dark' = 'dark';
  currentAnimation: AnimationType = 'fade';
  animationTypes: AnimationType[] = ['fade', 'slide', 'bounce', 'zoom'];

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }

  constructor(private toasterService: ToasterService) {
    // Set initial animation type
    this.setAnimationType(this.currentAnimation);
  }

  setAnimationType(animation: AnimationType) {
    this.currentAnimation = animation;
    this.toasterService.setAnimationType(animation);
  }

  addSuccessToast() {
    this.toasterService.showSuccess(
      this.message,
      this.toastTitle,
      this.duration
    );
  }

  addErrorToast() {
    this.toasterService.showError(this.message, this.toastTitle, this.duration);
  }

  addInfoToast() {
    this.toasterService.showInfo(this.message, this.toastTitle, this.duration);
  }

  addWarningToast() {
    this.toasterService.showWarning(
      this.message,
      this.toastTitle,
      this.duration
    );
  }
}
