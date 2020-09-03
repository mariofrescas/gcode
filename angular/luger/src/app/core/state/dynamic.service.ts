import { Injectable, Type } from '@angular/core';

import { Subject, Observable } from 'rxjs';

export enum DynamicStrategyType {
  Add, Remove
}

export interface DynamicStrategy {
  id: number;
  type: DynamicStrategyType;
  data?: any;
  component?: Type<any>;
}

@Injectable()
export class DynamicService {
  private subject: Subject<DynamicStrategy>;
  public observable: Observable<DynamicStrategy>;

  constructor() {
    this.subject = new Subject<DynamicStrategy>();
    this.observable = this.subject.asObservable();
  }

  public addDynamic(id: number, data: any, component: Type<any>): void {
    this.subject.next({ id, component, data, type: DynamicStrategyType.Add });
  }

  public removeDynamic(id: number): void {
    this.subject.next({ id, type: DynamicStrategyType.Remove });
  }
}
