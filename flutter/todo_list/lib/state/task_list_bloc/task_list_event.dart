part of 'task_list_bloc.dart';

@immutable
abstract class TaskListEvent {}

class TaskListAddEvent extends TaskListEvent {
  final TaskModel task;
  TaskListAddEvent(this.task);
}

class TaskListUpdateEvent extends TaskListEvent {
  final int index;
  final TaskModel task;
  TaskListUpdateEvent(this.index, this.task);
}
