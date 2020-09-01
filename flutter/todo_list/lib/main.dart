import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:todo_list/pages/edit_task/add_task_page.dart';
import 'package:todo_list/pages/task_list/task_list_page.dart';
import 'package:todo_list/state/task_list_bloc/task_list_bloc.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => TaskListBloc(),
      child: MaterialApp(
        title: 'TaskList App',
        routes: {
          '/': (_) => TaskListPage(),
          '/addTaskPage': (_) => AddTaskPage()
        }
      )
    );
  }
}
