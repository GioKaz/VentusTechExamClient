import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../core/models/task.model';

@Pipe({
  name: 'priorityLabel'
})
export class PriorityLabelPipe implements PipeTransform {
  transform(value: TaskPriority): string {
    switch (value) {
      case TaskPriority.Baja: return 'Baja';
      case TaskPriority.Media: return 'Media';
      case TaskPriority.Alta: return 'Alta';
      default: return 'Desconocida';
    }
  }
}
