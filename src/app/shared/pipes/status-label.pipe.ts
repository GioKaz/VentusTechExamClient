import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../core/models/task.model';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: TaskStatus): string {
    switch (value) {
      case TaskStatus.Pendiente: return 'Pendiente';
      case TaskStatus.EnProgreso: return 'En Progreso';
      case TaskStatus.Completada: return 'Completada';
      default: return 'Desconocido';
    }
  }
}
