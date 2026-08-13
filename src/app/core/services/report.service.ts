import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PendingTaskReport } from '../models/report.model';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../models/paginated-result.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) { }

  getPendingTasksReport(pageNumber: number = 1, pageSize: number = 10, search?: string): Observable<PaginatedResult<PendingTaskReport>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      
    if (search) {
      params = params.set('userName', search);
    }

    return this.http.get<PaginatedResult<PendingTaskReport>>(`${this.apiUrl}/pending-tasks`, { params });
  }
}
