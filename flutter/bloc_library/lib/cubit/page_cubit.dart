import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

import '../models/counter.dart';
import '../services/counter_service.dart';

part 'page_state.dart';

class PageCubit extends Cubit<PageState> {
  final CounterService _counterService;
  PageCubit(this._counterService) : super(PageInitial());

  Future<void> getCounter() async {
    this.emit(PageLoading());
    final counter = await this._counterService.getCounter();
    this.emit(PageLoaded(counter));
  }
}
