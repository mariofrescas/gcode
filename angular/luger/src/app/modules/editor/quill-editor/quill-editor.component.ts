import { Component, Input } from '@angular/core';

import { TreeItemModel } from '@core/models/tree-item.model';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css']
})
export class QuillEditorComponent {
  @Input() item: TreeItemModel;

  public quillConfig = { toolbar: '.toolbar' };
}
