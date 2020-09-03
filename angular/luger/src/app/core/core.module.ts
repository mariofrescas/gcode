import { NgModule, Optional, SkipSelf } from '@angular/core';

import { DataService } from './data/data.service';
import { FileService } from './backend/file.service';
import { CommonService } from './api/common.service';
import { DynamicService } from './state/dynamic.service';
import { DatabaseService } from './backend/database.service';
import { PlatformService } from './backend/platform.service';
import { MenuOptionsService } from './util/menu-options.service';

@NgModule({
  providers: [
    DataService,
    FileService,
    CommonService,
    DynamicService,
    DatabaseService,
    PlatformService,
    MenuOptionsService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
