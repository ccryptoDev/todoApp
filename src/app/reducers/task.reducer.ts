import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { Task } from '../models/task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),

  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),

  on(TaskActions.editTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),

  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  }))
);
