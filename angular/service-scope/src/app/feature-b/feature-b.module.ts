import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FeatureBComponent } from './feature-b.component';
import { FeatureBService } from './feature-b.service';

@NgModule({
  declarations: [
    FeatureBComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FeatureBComponent
  ],
  providers: [
    FeatureBService
  ]
})
export class FeatureBModule { }
