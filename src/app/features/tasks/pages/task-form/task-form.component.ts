import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task.service';
import { TaskPriority, TaskStatus, CreateTaskCommand, UpdateTaskCommand } from '../../../../core/models/task.model';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  isLoading = false;
  isSaving = false;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      priority: [0, Validators.required],
      fechaLimite: ['', Validators.required],
      estatus: [0], // Only relevant in edit mode
      usuarioResponsable: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.taskId = +idParam;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number) {
    this.isLoading = true;
    this.taskService.getTaskById(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(task => {
        // Format date for <input type="date">
        const dateStr = new Date(task.fechaLimite).toISOString().split('T')[0];
        
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          fechaLimite: dateStr,
          estatus: task.estatus,
          usuarioResponsable: task.usuarioResponsable
        });
        
        // In edit mode, usually user can't change 'usuarioResponsable' easily or we disable it
        this.taskForm.get('usuarioResponsable')?.disable();
      });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.taskForm.getRawValue();
    const dateVal = new Date(formValue.fechaLimite);

    if (this.isEditMode && this.taskId) {
      const command: UpdateTaskCommand = {
        id: this.taskId,
        title: formValue.title,
        description: formValue.description,
        priority: +formValue.priority,
        fechaLimite: dateVal,
        estatus: +formValue.estatus
      };
      
      this.taskService.updateTask(this.taskId, command)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: () => {
            this.alertService.showSuccess('La tarea ha sido actualizada exitosamente.', '¡Tarea Actualizada!', () => {
              this.router.navigate(['/tasks']);
            });
          },
          error: (err) => {
            this.alertService.showError('Ocurrió un error al intentar actualizar la tarea.', 'Error');
          }
        });
    } else {
      const command: CreateTaskCommand = {
        title: formValue.title,
        description: formValue.description,
        priority: +formValue.priority,
        fechaLimite: dateVal,
        usuarioResponsable: formValue.usuarioResponsable
      };
      
      this.taskService.createTask(command)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: () => {
            this.alertService.showSuccess('La nueva tarea ha sido creada exitosamente.', '¡Tarea Creada!', () => {
              this.router.navigate(['/tasks']);
            });
          },
          error: (err) => {
            this.alertService.showError('Ocurrió un error al intentar crear la tarea.', 'Error');
          }
        });
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
