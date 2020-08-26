import '../models/counter.dart';

abstract class CounterService {
  Future<Counter> getCounter();
}

class MockCounterService implements CounterService {
  @override
  Future<Counter> getCounter() {
    return Future.delayed(
      Duration(seconds: 3),
      () {
        return Counter(value: 0);
      }
    );
  }
}
