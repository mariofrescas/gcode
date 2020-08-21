import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CounterIncrement extends StatelessWidget {
  final Function onPress;

  const CounterIncrement({Key key, @required this.onPress}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print('BUILD: CounterIncrement');

    return Container(
      child: FloatingActionButton(child: Icon(Icons.add), onPressed: () { this.onPress(); })
    );
  }
}
