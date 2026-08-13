export enum TaskPriority {
  Baja = 0,
  Media = 1,
  Alta = 2
}

export enum TaskStatus {
  Pendiente = 0,
  EnProgreso = 1,
  Completada = 2
}

export interface TaskItem {
  id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  fechaCreacion: Date;
  fechaInicio?: Date;
  fechaFinalizacion?: Date;
  fechaLimite: Date;
  estatus: TaskStatus;
  usuarioResponsable: string;
}

export interface CreateTaskCommand {
  title: string;
  description?: string;
  priority: TaskPriority;
  fechaLimite: Date;
  usuarioResponsable: string;
}

export interface UpdateTaskCommand {
  id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  fechaLimite: Date;
  estatus: TaskStatus;
}
