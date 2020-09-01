import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:todo_list/models/task_model.dart';
import 'package:todo_list/state/task_list_bloc/task_list_bloc.dart';
import 'package:todo_list/pages/edit_task/widgets/task_description_widget.dart';

class AddTaskPage extends StatelessWidget {
  final taskDescContro = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Task'),
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () {
              context.bloc<TaskListBloc>()
                .add(TaskListAddEvent(TaskModel(taskDescContro.text, false)));
              Navigator.of(context).pop();
            }
          )
        ]
      ),
      body: TaskDescriptionWidget(controller: taskDescContro)
    );
  }
}
