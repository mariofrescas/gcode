import { Action } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const AddTaskType = '[Task] Add';

export class AddTask implements Action {
  readonly type: string = AddTaskType;

  constructor(public payload: Task) {
  }
}
