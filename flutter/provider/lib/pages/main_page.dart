import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import './widgets/counter_label.dart';
import '../shared/counter_increment.dart';

import '../stores/counter_store.dart';

class MainPage extends StatelessWidget {
  const MainPage({Key key}) : super(key: key);

  Widget build(BuildContext context) {
    print('BUILD: MainPage');

    return Scaffold(
      appBar: AppBar(title: Text('Provider')),
      body: Center(child: CounterLabel()),
      floatingActionButton: CounterIncrement(onPress: () { context.read<CounterStore>().increment(); })
    );
  }
}
