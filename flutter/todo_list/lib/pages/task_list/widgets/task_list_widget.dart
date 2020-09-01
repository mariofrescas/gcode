import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:todo_list/models/task_model.dart';
import 'package:todo_list/pages/task_list/widgets/task_widget.dart';
import 'package:todo_list/state/task_list_bloc/task_list_bloc.dart';

class TaskListWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TaskListBloc, TaskListState>(
      builder: (context, state) {
        return ListView.builder(
          itemCount: state.taskList.taskList.length,
          itemBuilder: (context, index) {
            return TaskWidget(
              task: state.taskList.taskList[index].text,
              checked: state.taskList.taskList[index].checked,
              onTap: () {
                final task = TaskModel(
                  state.taskList.taskList[index].text,
                  !state.taskList.taskList[index].checked
                );
                context.bloc<TaskListBloc>()
                  .add(TaskListUpdateEvent(index, task));
              }
            );
          }
        );
      }
    );
  }
}
