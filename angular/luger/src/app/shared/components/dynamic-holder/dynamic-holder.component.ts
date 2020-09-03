import {
  Component,
  Type,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentRef,
  ComponentFactoryResolver
} from '@angular/core';

import {
  DynamicService,
  DynamicStrategyType
} from '@core/state/dynamic.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicDirective } from '@shared/directives/dynamic.directive';

@Component({
  selector: 'app-dynamic-holder',
  templateUrl: './dynamic-holder.component.html'
})
export class DynamicHolderComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicDirective, { static: true }) holder: DynamicDirective;

  private dynamics = new Map<number, ComponentRef<any>>();
  private unsubDynamic = new Subject<void>();

  constructor(
    private dynamicService: DynamicService,
    private factoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit(): void {
    this.dynamicService.observable
    .pipe(takeUntil(this.unsubDynamic))
    .subscribe((strategy) => {
      if (strategy.type === DynamicStrategyType.Add) {
        this.addDynamic(strategy.id, strategy.data, strategy.component);
      } else {
        this.removeDynamic(strategy.id);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubDynamic.next();
    this.unsubDynamic.complete();
  }

  private addDynamic(id: number, data: any, component: Type<any>): void {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const view = this.holder.viewContainerRef;
    const componentRef = view.createComponent(factory);
    componentRef.instance.data = data;

    this.dynamics.set(id, componentRef);
  }

  private removeDynamic(id: number): void {
    this.dynamics.get(id).destroy();
    this.dynamics.delete(id);
  }
}

