import 'package:meta/meta.dart';
import 'package:bloc/bloc.dart';

import 'package:todo_list/models/task_model.dart';
import 'package:todo_list/models/task_list_model.dart';

part 'task_list_event.dart';
part 'task_list_state.dart';

class TaskListBloc extends Bloc<TaskListEvent, TaskListState> {
  TaskListBloc(): super(TaskListState(TaskListModel(<TaskModel>[])));

  @override
  Stream<TaskListState> mapEventToState(TaskListEvent event) async* {
    if (event is TaskListAddEvent) {
      yield TaskListState(TaskListModel([...state.taskList.taskList, event.task]));
    } else if (event is TaskListUpdateEvent) {
      final newList = [...state.taskList.taskList];
      newList[event.index] = event.task;
      yield TaskListState(TaskListModel(newList));
    } else {
      throw('TaskListBloc.mapEventToState: Event not found!');
    }
  }
}
