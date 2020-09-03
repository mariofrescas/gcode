import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TreeItemModel } from '@core/models/tree-item.model';

@Component({
  selector: 'app-tree-list',
  templateUrl: 'tree-list.component.html',
  styleUrls: ['tree-list.component.css']
})
export class TreeListComponent {
  @Input() items: TreeItemModel[];
  @Input() mode: string;

  @Output() itemsSort = new EventEmitter<TreeItemModel[]>();
  @Output() itemOptionsClick = new EventEmitter<TreeItemModel>();
  @Output() itemClick = new EventEmitter<TreeItemModel>();
  @Output() itemForwardClick = new EventEmitter<TreeItemModel>();
  @Output() itemSelectClick = new EventEmitter<TreeItemModel>();

  public onItemsSort(items: TreeItemModel[]): void {
    this.itemsSort.emit(items);
  }

  private onItemOptionsClick(item: TreeItemModel): void {
    this.itemOptionsClick.emit(item);
  }

  private onItemClick(item: TreeItemModel): void {
    this.itemClick.emit(item);
  }

  private onItemForwardClick(item: TreeItemModel): void {
    this.itemForwardClick.emit(item);
  }

  private onItemSelectClick(item: TreeItemModel): void {
    this.itemSelectClick.emit(item);
  }
}
