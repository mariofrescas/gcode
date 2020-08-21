import 'package:flutter/foundation.dart';

class CounterStore with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    this._count++;
    notifyListeners();
  }

  void decrement() {
    this._count--;
    notifyListeners();
  }
}
