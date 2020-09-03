import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TreeItemModel } from '@core/models/tree-item.model';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.css']
})
export class EditorHeaderComponent {
  @Input() item: TreeItemModel;

  @Output() closeClick = new EventEmitter<void>();
  @Output() titleClick = new EventEmitter<void>();
  @Output() saveClick = new EventEmitter<void>();

  public onCloseClick(): void {
    this.closeClick.emit();
  }

  public onTitleClick(): void {
    this.titleClick.emit();
  }

  public onSaveClick(): void {
    this.saveClick.emit();
  }
}
