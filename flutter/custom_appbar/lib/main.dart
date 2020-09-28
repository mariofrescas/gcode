import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'custom_appbar',
      home: Home()
    );
  }
}

class Home extends StatelessWidget {
  static const double ICON_SIZE = 28;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('Content')),
      appBar: AppBar(
        centerTitle: true,
        shadowColor: Colors.transparent,
        backgroundColor: Colors.transparent,
        title: Container(
          height: kToolbarHeight,
          decoration: BoxDecoration(
            color: Color(0xFF3F51B5),
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(20))
          ),
        ),
        leading: IconButton(icon: Icon(Icons.menu), color: Color(0xFF3F51B5), iconSize: ICON_SIZE, onPressed: () => { }),
        actions: [
          IconButton(icon: Icon(Icons.more_vert), color: Color(0xFF3F51B5), iconSize: ICON_SIZE, onPressed: () => { })
        ],
      )
    );
  }
}
