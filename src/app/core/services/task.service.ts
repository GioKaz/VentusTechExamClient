import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../models/paginated-result.model';
import { CreateTaskCommand, TaskItem, UpdateTaskCommand } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(
    page: number = 1,
    pageSize: number = 20,
    priority?: number,
    estatus?: number,
    usuario?: string,
    fechaInicio?: Date,
    fechaFin?: Date
  ): Observable<PaginatedResult<TaskItem>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (priority !== undefined && priority !== null) params = params.set('priority', priority.toString());
    if (estatus !== undefined && estatus !== null) params = params.set('estatus', estatus.toString());
    if (usuario) params = params.set('usuario', usuario);
    if (fechaInicio) params = params.set('fechaInicio', fechaInicio.toISOString());
    if (fechaFin) params = params.set('fechaFin', fechaFin.toISOString());

    return this.http.get<PaginatedResult<TaskItem>>(this.apiUrl, { params });
  }

  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  createTask(command: CreateTaskCommand): Observable<number> {
    return this.http.post<number>(this.apiUrl, command);
  }

  updateTask(id: number, command: UpdateTaskCommand): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, command);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
