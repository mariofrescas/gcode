import 'package:flutter/material.dart';

class AddTaskWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      child: Icon(Icons.add),
      onPressed: () {
        Navigator.of(context).pushNamed('/addTaskPage');
      }
    );
  }
}
