part of 'task_list_bloc.dart';

class TaskListState {
  final TaskListModel taskList;
  const TaskListState(this.taskList);

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;
  
    return o is TaskListState &&
      o.taskList == taskList;
  }

  @override
  int get hashCode => taskList.hashCode;
}
