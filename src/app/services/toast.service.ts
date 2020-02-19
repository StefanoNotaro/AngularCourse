import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showStandard() {
    this.show('I am a standard toast', {
      delay: 5000,
      autohide: true,
      classname: ''
    });
  }

  showSuccess(message: string) {
    this.show(message, {
      classname: 'bg-success text-light',
      delay: 10000 ,
      autohide: true,
      headertext: 'Success!',
      positionClass: 'toast-bottom-right'
    });
  }

  showError() {
    this.show('I am an error toast', {
      classname: 'bg-danger text-light',
      delay: 15000 ,
      autohide: false,
      headertext: 'Error!!!'
    });
  }

  showCustomToast(customTpl) {
    this.show(customTpl, {
      classname: 'bg-info text-light',
      delay: 3000,
      autohide: true
    });
  }
}
