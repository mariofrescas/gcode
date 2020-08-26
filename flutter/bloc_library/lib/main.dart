import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'cubit/page_cubit.dart';
import 'cubit/counter_cubit.dart';

import 'services/counter_service.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      home: MultiBlocProvider(
        providers: [
          BlocProvider<PageCubit>(
            create: (context) => PageCubit(MockCounterService())
          ),
          BlocProvider<CounterCubit>(
            create: (context) => CounterCubit()
          ),
        ],
        child: MainPage()
      )
    );
  }
}

class MainPage extends StatelessWidget {
  const MainPage({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Material App Bar'),
      ),
      body: Center(
        child: Container(
          child: BlocBuilder<PageCubit, PageState>(
            builder: (context, state) {
              if (state is PageInitial) {
                return Text('Inicio');
              } else if (state is PageLoading) {
                return Text('Cargando...');
              } else if (state is PageLoaded) {
                context.bloc<CounterCubit>().setValue(state.counter);
                return BlocBuilder<CounterCubit, CounterState>(
                  builder: (context, state) {
                    return Text(state.counter.value.toString());
                  }
                );
              } else {
                return Text('Error');
              }
            }
          )
        )
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(child: Icon(Icons.search), onPressed: () { context.bloc<PageCubit>().getCounter(); }),
          FloatingActionButton(child: Icon(Icons.add), onPressed: () { context.bloc<CounterCubit>().increment(); }),
        ]
      )
    );
  }
}
