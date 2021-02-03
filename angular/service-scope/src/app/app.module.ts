import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FeatureAModule } from './feature-a/feature-a.module';
import { FeatureBModule } from './feature-b/feature-b.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FeatureAModule,
    FeatureBModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
