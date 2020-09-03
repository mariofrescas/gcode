import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TreeItemModel } from '@core/models/tree-item.model';

@Component({
  selector: 'app-browser-header',
  templateUrl: './browser-header.component.html',
  styleUrls: ['./browser-header.component.css']
})
export class BrowserHeaderComponent {
  @Input() item: TreeItemModel;
  @Input() mode: string;

  @Output() backClick = new EventEmitter<void>();
  @Output() cancelSelectionClick = new EventEmitter<void>();
  @Output() titleClick = new EventEmitter<void>();
  @Output() lugerClick = new EventEmitter<void>();
  @Output() addClick = new EventEmitter<void>();
  @Output() optionsSelectionClick = new EventEmitter<void>();

  private onBackClick(): void {
    this.backClick.emit();
  }

  private onCancelSelectionClick(): void {
    this.cancelSelectionClick.emit();
  }

  private onTitleClick(): void {
    this.titleClick.emit();
  }

  private onLugerClick(): void {
    this.lugerClick.emit();
  }

  private onAddClick(): void {
    this.addClick.emit();
  }

  private onOptionsSelectionClick(): void {
    this.optionsSelectionClick.emit();
  }
}
