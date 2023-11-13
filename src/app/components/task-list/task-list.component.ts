import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../actions/task.actions';
import { TaskService } from '../../services/task.service';
import { AppState } from '../../app.module';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  editModeMap: { [taskId: number]: boolean } = {};
  newTask: Task = { id: 0, title: '', body: '', userId: 1};
  editedTaskTitle: string = '';
  editedTaskBody: string = '';

  constructor(private store: Store<AppState>, private taskService: TaskService) {
    this.tasks$ = store.pipe(select('taskFeature', 'tasks'));
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  deleteTask(taskId: number) {
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
  }

  editTask(taskId: number) {
    this.editModeMap[taskId] = true;
    this.tasks$.subscribe(tasks => {
      this.editedTaskTitle = (tasks.find((task) => task.id === taskId) as Task)?.title || '';
      this.editedTaskBody = (tasks.find((task) => task.id === taskId) as Task)?.body || '';
    });
  }

  cancelEdit(taskId: number) {
    this.editModeMap[taskId] = false;
  }

  saveEditedTask(editedTask: Task) {
    const updatedTask: Task = { ...editedTask, title: this.editedTaskTitle, body: this.editedTaskBody };

    this.store.dispatch(TaskActions.editTask({ task: updatedTask }));
    this.cancelEdit(editedTask.id);
  }

  addNewTask() {
    // this.tasks$.subscribe(tasks => {
    //   const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    //   this.newTask.id = maxId + 1;

    //   if (this.newTask.title && this.newTask.body) {
    //     this.store.dispatch(TaskActions.addTask({ task: this.newTask }));
    //     this.newTask = { id: 0, title: '', body: '', userId: 1 };
    //   }
    // });
    this.tasks$.pipe(take(1)).subscribe(tasks => {
      const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
      const newTaskWithId = { ...this.newTask, id: maxId + 1 };

      if (newTaskWithId.title && newTaskWithId.body) {
        this.store.dispatch(TaskActions.addTask({ task: newTaskWithId }));
        this.newTask = { id: 0, title: '', body: '', userId: 1 };
      }
    });
  }
}
