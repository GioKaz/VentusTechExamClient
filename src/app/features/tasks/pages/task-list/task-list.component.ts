import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task.service';
import { TaskItem } from '../../../../core/models/task.model';
import { PaginatedResult } from '../../../../core/models/paginated-result.model';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasksData: PaginatedResult<TaskItem> | null = null;
  isLoading = false;
  
  // Filters
  page = 1;
  pageSize = 20;
  priorityFilter: number | null = null;
  statusFilter: number | null = null;
  userFilter: string = '';
  
  // Dialog state
  isDialogVisible = false;
  taskToDelete: number | null = null;
  isDeleting = false;

  constructor(
    private taskService: TaskService, 
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks(
      this.page, 
      this.pageSize, 
      this.priorityFilter ?? undefined, 
      this.statusFilter ?? undefined, 
      this.userFilter || undefined
    )
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(data => {
      this.tasksData = data;
    });
  }

  onFilterChange() {
    this.page = 1;
    this.loadTasks();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadTasks();
  }

  createTask() {
    this.router.navigate(['/tasks/new']);
  }

  editTask(id: number) {
    this.router.navigate(['/tasks/edit', id]);
  }

  requestDelete(id: number) {
    this.taskToDelete = id;
    this.isDialogVisible = true;
  }

  confirmDelete() {
    if (this.taskToDelete !== null) {
      this.isDeleting = true;
      this.taskService.deleteTask(this.taskToDelete)
        .pipe(finalize(() => {
          this.isDeleting = false;
          this.isDialogVisible = false;
          this.taskToDelete = null;
        }))
        .subscribe({
          next: () => {
            this.alertService.showSuccess('La tarea ha sido eliminada exitosamente.', '¡Tarea Eliminada!', () => {
              this.loadTasks();
            });
          },
          error: (err) => {
            this.alertService.showError('Ocurrió un error al intentar eliminar la tarea.', 'Error');
          }
        });
    }
  }

  cancelDelete() {
    this.isDialogVisible = false;
    this.taskToDelete = null;
  }
}


