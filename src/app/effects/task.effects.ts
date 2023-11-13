import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError(() => of({ type: 'Error in loading tasks' }))
        )
      )
    )
  );

  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(({ task }) => this.taskService.addTask(task)
      .pipe(
        map(addedTask => TaskActions.addTaskSuccess({ task: addedTask })),
        catchError(() => of({ type: 'Error in adding task' }))
      ))
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((editedTask: any) => TaskActions.editTaskSuccess({ task: editedTask })),
          catchError(() => of(TaskActions.editTaskFailure()))
        )
      )
    )
  );

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(({ taskId }) => this.taskService.deleteTask(taskId)
      .pipe(
        map(() => TaskActions.deleteTaskSuccess({ taskId })),
        catchError(() => of({ type: 'Error while deleting task' }))
      )
    ))
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
