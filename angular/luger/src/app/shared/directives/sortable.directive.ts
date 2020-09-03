import {
  Input,
  Output,
  Directive,
  ElementRef,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

import { Sortable } from '@shopify/draggable';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements AfterViewInit {
  @Input() sortableData: any[];
  @Output() sortableStop = new EventEmitter<any>();

  private sortable: Sortable;

  constructor(private el: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.sortable = new Sortable(this.el.nativeElement, {
      draggable: 'app-tree-item',
      delay: 500
    });

    this.sortable.on('sortable:stop', (event) => { this.handleStop(event); });
  }

  private handleStop(event: any): void {
    const { newIndex, oldIndex } = event;
    const next = this.sortableData;
    const moved = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved[0]);

    this.sortableStop.emit(next);
  }
}
