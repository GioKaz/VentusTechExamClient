import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertData {
  title: string;
  message: string;
  type: 'error' | 'info' | 'success';
  onClose?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<AlertData>();
  alert$ = this.alertSubject.asObservable();

  showError(message: string, title: string = 'Error', onClose?: () => void) {
    this.alertSubject.next({ title, message, type: 'error', onClose });
  }

  showInfo(message: string, title: string = 'Información', onClose?: () => void) {
    this.alertSubject.next({ title, message, type: 'info', onClose });
  }

  showSuccess(message: string, title: string = 'Éxito', onClose?: () => void) {
    this.alertSubject.next({ title, message, type: 'success', onClose });
  }
}
