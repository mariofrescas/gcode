import 'package:meta/meta.dart';

class Counter {
  final int value;

  Counter({@required this.value});

  @override
  bool operator==(Object o) {
    if (identical(this, o)) return true;

    return o is Counter && o.value == value;
  }

  @override
  int get hashCode => value.hashCode;
}
