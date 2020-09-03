import { NgModule } from '@angular/core';

import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';

import { EditorComponent } from './editor.component';
import { EditorHeaderComponent } from './header/editor-header.component';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';

@NgModule({
  declarations: [
    EditorComponent,
    QuillEditorComponent,
    EditorHeaderComponent
  ],
  imports: [
    QuillModule,
    FormsModule,
    CommonModule,
    SharedModule,
    EditorRoutingModule
  ]
})
export class EditorModule {
}
