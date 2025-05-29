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
import { ToasterService, ToasterType, Toaster, AnimationType } from './toaster.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'lib-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toasterAnimation', [
      // Fade animation
      transition('void => fade', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition('fade => void', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ]),
      
      // Slide animation - position specific
      // Top Left - slide from left
      transition('void => slide-top-left', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('slide-top-left => void', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ]),
      
      // Top Right - slide from right
      transition('void => slide-top-right', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('slide-top-right => void', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ]),
      
      // Bottom Left - slide from left
      transition('void => slide-bottom-left', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('slide-bottom-left => void', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ]),
      
      // Bottom Right - slide from right
      transition('void => slide-bottom-right', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('slide-bottom-right => void', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ]),
      
      // Top Center - slide from top
      transition('void => slide-top-center', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition('slide-top-center => void', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ]),
      
      // Bottom Center - slide from bottom
      transition('void => slide-bottom-center', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition('slide-bottom-center => void', [
        animate('400ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ]),
      
      // Default slide (fallback)
      transition('void => slide', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('slide => void', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ]),
      
      // Bounce animation
      transition('void => bounce', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('500ms cubic-bezier(.62,.28,.23,1.42)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition('bounce => void', [
        animate('400ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
      ]),
      
      // Zoom animation
      transition('void => zoom', [
        style({ transform: 'scale(1.2)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition('zoom => void', [
        animate('400ms ease-in', style({ transform: 'scale(0)', opacity: 0 }))
      ])
    ])
  ]
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

  // Get progress bar color based on type and theme
  getProgressBarColor(type: ToasterType): string {
    if (this.themeService === 'light') {
      switch (type) {
        case 'success':
          return '#4caf50';
        case 'error':
          return '#f44336';
        case 'info':
          return '#2196f3';
        case 'warning':
          return '#ff9800';
        default:
          return '#4caf50';
      }
    } else {
      // Dark theme (default)
      switch (type) {
        case 'success':
          return '#2ecc71';
        case 'error':
          return '#e74c3c';
        case 'info':
          return '#3498db';
        case 'warning':
          return '#f39c12';
        default:
          return '#2ecc71';
      }
    }
  }

  // Get animation state based on animation type and position
  getAnimationState(animation: AnimationType): string {
    if (animation === 'slide') {
      return `slide-${this.toasterPosition}`;
    }
    return animation;
  }
}
