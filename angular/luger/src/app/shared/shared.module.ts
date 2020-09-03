import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicDirective } from './directives/dynamic.directive';
import { ModalComponent} from './components/modal/modal.component';
import { SortableDirective } from './directives/sortable.directive';
import { InputComponent } from './components/input/input.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { OptionMenuComponent } from './components/option-menu/option-menu.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { DynamicHolderComponent } from './components/dynamic-holder/dynamic-holder.component';

@NgModule({
  declarations: [
    ModalComponent,
    InputComponent,
    HeaderComponent,
    ConfirmComponent,
    DynamicDirective,
    SortableDirective,
    BackdropComponent,
    TreeItemComponent,
    AutofocusDirective,
    OptionMenuComponent,
    ColorPickerComponent,
    DynamicHolderComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    ModalComponent,
    InputComponent,
    HeaderComponent,
    ConfirmComponent,
    BackdropComponent,
    TreeItemComponent,
    SortableDirective,
    AutofocusDirective,
    OptionMenuComponent,
    ColorPickerComponent,
    DynamicHolderComponent
  ]
})
export class SharedModule {
}
