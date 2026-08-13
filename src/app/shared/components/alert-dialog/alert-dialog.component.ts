import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, AlertData } from '../../../core/services/alert.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit, OnDestroy {
  isVisible = false;
  alertData: AlertData | null = null;
  private subscription!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alert$.subscribe(data => {
      this.alertData = data;
      this.isVisible = true;
    });
  }

  close() {
    this.isVisible = false;
    const callback = this.alertData?.onClose;
    setTimeout(() => {
      this.alertData = null;
      if (callback) {
        callback();
      }
    }, 300); // Wait for animation
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
