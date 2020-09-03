import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddTask } from './task-list.actions';
import { Task, Status } from '../../models/task.model';

interface AppState {
  taskList: Task[];
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  public newTaskInput: string;
  public taskList: Observable<Task[]>;

  constructor(private store: Store<AppState>) {
    this.taskList = this.store.select('taskList');
  }

  public onAddButton(): void {
    this.store.dispatch(
      new AddTask(new Task(Status.Inactive, this.newTaskInput))
    );
    this.newTaskInput = '';
  }
}
