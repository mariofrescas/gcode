import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BrowserRoutingModule } from './browser-routing.module';

import { BrowserComponent } from './browser.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { BrowserHeaderComponent } from './header/browser-header.component';

import { InputComponent } from '@shared/components/input/input.component';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { OptionMenuComponent } from '@shared/components/option-menu/option-menu.component';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';

@NgModule({
  declarations: [
    BrowserComponent,
    TreeListComponent,
    BrowserHeaderComponent
  ],
  entryComponents: [
    InputComponent,
    ConfirmComponent,
    OptionMenuComponent,
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserRoutingModule
  ]
})
export class BrowserModule {
}
