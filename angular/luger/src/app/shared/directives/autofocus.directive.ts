import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
