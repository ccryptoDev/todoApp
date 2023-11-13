import * as TaskActions from './task.actions';

describe('Task Actions', () => {
  it('should create LoadTasks action', () => {
    const action = TaskActions.loadTasks();
    expect({ ...action }).toEqual({ type: '[Task] Load Tasks' });
  });

  it('should create LoadTasksSuccess action', () => {
    const tasks = [{ id: 1, title: 'Task 1', body: 'Description 1', userId: 1 }];
    const action = TaskActions.loadTasksSuccess({ tasks });
    expect({ ...action }).toEqual({
      type: '[Task] Load Tasks Success',
      tasks: tasks,
    });
  });

});
