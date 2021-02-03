import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FeatureAComponent } from './feature-a.component';
import { FeatureBModule } from '../feature-b/feature-b.module';

@NgModule({
  declarations: [
    FeatureAComponent
  ],
  imports: [
    CommonModule,
    FeatureBModule
  ],
  exports: [
    FeatureAComponent
  ]
})
export class FeatureAModule { }
