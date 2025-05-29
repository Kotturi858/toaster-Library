# Kotturi Toaster

A lightweight, customizable toast notification library for Angular applications.

## Features

- 🎨 Four notification types: Success, Error, Info, and Warning
- ⏱️ Configurable duration for each toast
- 📍 Multiple position options (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
- ⏸️ Pause on hover functionality
- 🌓 Light and dark theme support
- ❌ Close button to dismiss notifications
- 📊 Progress bar indicating time remaining
- ✨ Smooth entrance and exit animations
- 🎯 Standalone component compatible with Angular 19+

## Installation

```bash
npm install kotturi-toaster
```

## Usage

### 1. Import the ToasterModule in your application

```typescript
import { ToasterModule } from 'kotturi-toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToasterModule],
  // ...
})
export class AppComponent {
  // ...
}
```

### 2. Add the toaster component to your template

```html
<!-- app.component.html -->
<lib-toaster [toasterPosition]="'bottom-right'"></lib-toaster>
```

### 3. Inject and use the ToasterService

```typescript
import { Component } from '@angular/core';
import { ToasterService } from 'kotturi-toaster';

@Component({
  // ...
})
export class AppComponent {
  constructor(private toasterService: ToasterService) {}

  showSuccessToast() {
    this.toasterService.showSuccess('Operation completed successfully!', 'Success', 5);
  }

  showErrorToast() {
    this.toasterService.showError('An error occurred!', 'Error', 5);
  }

  showInfoToast() {
    this.toasterService.showInfo('This is an informational message.', 'Info', 5);
  }

  showWarningToast() {
    this.toasterService.showWarning('Please be cautious!', 'Warning', 5);
  }
}
```

## API Reference

### ToasterComponent

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| toasterPosition | 'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' | 'bottom-left' | Position of the toast notifications on the screen |
| themeService | 'dark' \| 'light' | 'dark' | Theme of the toast notifications |

### ToasterService

#### Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| showSuccess | message: string, title?: string, duration?: number | string (toast ID) | Shows a success toast notification |
| showError | message: string, title?: string, duration?: number | string (toast ID) | Shows an error toast notification |
| showInfo | message: string, title?: string, duration?: number | string (toast ID) | Shows an info toast notification |
| showWarning | message: string, title?: string, duration?: number | string (toast ID) | Shows a warning toast notification |
| removeToaster | id: string | void | Manually removes a toast notification by ID |
| pauseToaster | id: string | void | Pauses the timer of a toast notification |
| resumeToaster | id: string | void | Resumes the timer of a toast notification |

## Customization

The toaster notifications come with default styling, but you can override these styles in your global stylesheet if needed.

### Animations

The toaster library includes smooth entrance and exit animations. To ensure animations work properly, you need to import the BrowserAnimationsModule in your application:

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    // other imports...
  ],
  // ...
})
export class AppModule { }
```

For standalone applications:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    // other providers...
  ]
});
```

#### Animation Types

The library supports four different animation types for toast notifications:

- `fade`: Smooth fade in/out animation (default)
- `slide`: Sliding animation from the side
- `bounce`: Bouncing entrance and exit
- `zoom`: Zoom in/out animation

#### Setting Animation Type

You can set the animation type using the `setAnimationType` method of the `ToasterService`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ToasterService, AnimationType } from 'kotturi-toaster';

@Component({
  // ...
})
export class AppComponent implements OnInit {
  constructor(private toasterService: ToasterService) {}
  
  ngOnInit() {
    // Set animation type globally for all toasts
    this.toasterService.setAnimationType('zoom');
    
    // You can also use the AnimationType type for type safety
    const animationType: AnimationType = 'bounce';
    this.toasterService.setAnimationType(animationType);
  }
}
```

The animation type you set will apply to all subsequent toast notifications until you change it again.

## Examples

### Basic Usage

```typescript
// Show a success toast that will disappear after 5 seconds
this.toasterService.showSuccess('Your profile has been updated!', 'Success', 5);

// Show an error toast with a custom title and default duration
this.toasterService.showError('Failed to save changes', 'Update Failed');
```

### Advanced Usage

```typescript
// Store toast ID for later reference
const toastId = this.toasterService.showInfo('Processing your request...', 'Please Wait', 10);

// Later, manually remove the toast when the process completes
someAsyncProcess().then(() => {
  this.toasterService.removeToaster(toastId);
  this.toasterService.showSuccess('Process completed!', 'Done');
});
```

## Building and Publishing

To build the library, run:

```bash
ng build toaster
```

To publish to npm:

```bash
cd dist/kotturi/toaster
npm publish
```

## License

MIT

## Author

Bharath Kotturi
