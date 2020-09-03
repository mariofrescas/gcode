import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicHolder]'
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
