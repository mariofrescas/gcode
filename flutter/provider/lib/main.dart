import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './pages/main_page.dart';
import './stores/counter_store.dart';
 
void main() => runApp(MyApp());
 
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Manejo de estado con: Provider',
      home: ChangeNotifierProvider(
        create: (BuildContext context) => CounterStore(),
        child: MainPage()
      )
    );
  }
}
