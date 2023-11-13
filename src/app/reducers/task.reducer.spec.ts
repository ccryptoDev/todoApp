import { taskReducer, initialState } from './task.reducer';
import * as TaskActions from '../actions/task.actions';

describe('Task Reducer', () => {
  it('should handle LoadTasksSuccess', () => {
    const tasks = [{ id: 1, title: 'Task 1', body: 'Description 1', userId: 1 }];
    const action = TaskActions.loadTasksSuccess({ tasks });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual(tasks);
  });

  it('should handle AddTask', () => {
    const newTask = { id: 2, title: 'Task 2', body: 'Description 2', userId: 1 };
    const action = TaskActions.addTask({ task: newTask });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual([...initialState.tasks, newTask]);
  });
});
