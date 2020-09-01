import 'package:flutter/foundation.dart';

import 'package:todo_list/models/task_model.dart';

class TaskListModel {
  final List<TaskModel> taskList;
  const TaskListModel(this.taskList);

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;
  
    return o is TaskListModel &&
      listEquals(o.taskList, taskList);
  }

  @override
  int get hashCode => taskList.hashCode;
}
