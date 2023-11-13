import { createAction, props } from '@ngrx/store';
import { Task } from '../app.module';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: Task }>()
);

export const editTaskSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ taskId: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ taskId: number }>()
);

export const editTaskFailure = createAction('[Task] Edit Task Failure');
