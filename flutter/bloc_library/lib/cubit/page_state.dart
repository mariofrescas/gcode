part of 'page_cubit.dart';

@immutable
abstract class PageState {
  const PageState();
}

class PageInitial extends PageState {
  const PageInitial();
}

class PageLoading extends PageState {
  const PageLoading();
}

class PageLoaded extends PageState {
  final Counter counter;
  const PageLoaded(this.counter);

  @override
  bool operator==(Object o) {
    if (identical(this, o)) return true;

    return o is PageLoaded && o.counter == counter;
  }

  @override
  int get hashCode => counter.hashCode;
}
