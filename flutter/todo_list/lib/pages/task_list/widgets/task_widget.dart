import 'package:flutter/material.dart';

class TaskWidget extends StatelessWidget {
  final String task;
  final bool checked;
  final Function onTap;

  TaskWidget({@required this.task, @required this.checked, @required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      title: Text(task),
      trailing: (checked)?
        Icon(Icons.check_box)
      :
        Icon(Icons.check_box_outline_blank),
    );
  }
}
