import { Injectable } from '@angular/core';

declare let cordova: any;
declare let StatusBar: any;

@Injectable()
export class PlatformService {
  public setStatusBarColor(color: string): void {
    if (cordova.platformId === 'android') {
      StatusBar.backgroundColorByHexString(color);
    }
  }
}
