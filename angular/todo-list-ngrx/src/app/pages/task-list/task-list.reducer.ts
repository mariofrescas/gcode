import { Action } from '@ngrx/store';

import { Task, Status } from '../../models/task.model';
import * as Actions from './task-list.actions';

const initialState: Task[] = [
  new Task(Status.Inactive, 'Tarea 1')
];

export const taskListReducer = (state: Task[] = initialState, action: Action) => {
  switch (action.type) {
    case Actions.AddTaskType: {
      return [...state, (action as Actions.AddTask).payload];
    }
    default: {
      return state;
    }
  }
};
