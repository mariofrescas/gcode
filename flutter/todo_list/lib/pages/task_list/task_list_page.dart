import 'package:flutter/material.dart';

import 'package:todo_list/pages/task_list/widgets/add_task_widget.dart';
import 'package:todo_list/pages/task_list/widgets/task_list_widget.dart';

class TaskListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Task List')),
      body: TaskListWidget(),
      floatingActionButton: AddTaskWidget()
    );
  }
}
