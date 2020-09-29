import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app_bar.dart';

void main() {
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    systemNavigationBarColor: Color(0xFF303E8B),
    // statusBarColor: Color(0xFF303E8B)
    statusBarColor: Color(0xFF3F51B5)
  ));

  runApp(App());
}

