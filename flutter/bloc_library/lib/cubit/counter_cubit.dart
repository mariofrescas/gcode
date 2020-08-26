import 'package:bloc/bloc.dart';

import '../models/counter.dart';

part 'counter_state.dart';

class CounterCubit extends Cubit<CounterState> {
  CounterCubit() : super(CounterState(Counter(value: 0)));

  void setValue(Counter counter) {
    this.emit(CounterState(counter));
  }

  void increment() {
    this.emit(CounterState(Counter(value: state.counter.value + 1)));
  }
}
