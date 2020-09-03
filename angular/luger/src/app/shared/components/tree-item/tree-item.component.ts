import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TreeItemModel } from '@core/models/tree-item.model';

@Component({
  selector: 'app-tree-item',
  templateUrl: 'tree-item.component.html',
  styleUrls: ['tree-item.component.css']
})
export class TreeItemComponent {
  @Input() item: TreeItemModel;
  @Input() mode: string;

  @Output() optionsClick = new EventEmitter<void>();
  @Output() itemClick = new EventEmitter<void>();
  @Output() forwardClick = new EventEmitter<void>();
  @Output() selectClick = new EventEmitter<boolean>();

  public hasContentCss(): string {
    if (this.item.data.nchars === 0) {
      return 'scroll-container desc';
    } else {
      return 'scroll-container desc-content';
    }
  }

  public onOptionsClick(): void {
    this.optionsClick.emit();
  }

  public onItemClick(): void {
    this.itemClick.emit();
  }

  public onForwardClick(): void {
    this.forwardClick.emit();
  }

  public onSelectClick(): void {
    this.selectClick.emit();
  }
}
