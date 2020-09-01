
class TaskModel {
  final String text;
  final bool checked;
  const TaskModel(this.text, this.checked);

  @override
  bool operator ==(Object o) {
    if (identical(this, o)) return true;
  
    return o is TaskModel &&
      o.text == text &&
      o.checked == checked;
  }

  @override
  int get hashCode => text.hashCode;
}
