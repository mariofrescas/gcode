import 'package:flutter/material.dart';

class TaskDescriptionWidget extends StatelessWidget {
  final TextEditingController controller;

  TaskDescriptionWidget({@required this.controller});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.only(left: 15.0, right: 15.0),
        child: TextField(
          controller: controller,
          decoration: InputDecoration(
            border: OutlineInputBorder(),
            labelText: 'Task Description'
          )
        )
      )
    );
  }
}
