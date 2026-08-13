import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        let title = 'Error';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          if (error.error && error.error.error) {
             title = 'Error de Validación';
             errorMessage = error.error.error;
             if (error.error.details) {
                 let validationMsgs = '<br><br><b>Validaciones:</b><br>';
                 const details = error.error.details;
                 for (const key in details) {
                     if (details.hasOwnProperty(key)) {
                         details[key].forEach((msg: string) => {
                             validationMsgs += `• ${msg}<br>`;
                         });
                     }
                 }
                 errorMessage += validationMsgs;
             }
          } else {
             errorMessage = `Error Code: ${error.status}<br>Message: ${error.message}`;
          }
        }
        
        this.alertService.showError(errorMessage, title);
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
