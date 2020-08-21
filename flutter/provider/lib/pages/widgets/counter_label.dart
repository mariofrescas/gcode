import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import '../../stores/counter_store.dart';

class CounterLabel extends StatelessWidget {
  const CounterLabel({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print('BUILD: CounterLabel');

    return Text(context.watch<CounterStore>().count.toString());
  }
}
