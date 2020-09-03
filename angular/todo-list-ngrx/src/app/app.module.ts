import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

import { taskListReducer } from './pages/task-list/task-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ taskList: taskListReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
