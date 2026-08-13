import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PriorityLabelPipe } from './pipes/priority-label.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    PaginationComponent,
    PriorityLabelPipe,
    StatusLabelPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    PaginationComponent,
    PriorityLabelPipe,
    StatusLabelPipe
  ]
})
export class SharedModule { }
