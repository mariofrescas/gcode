import { Component } from '@angular/core';

import { DynamicService } from '@core/state/dynamic.service';
import { MenuOptionScheme } from '@shared/schemes/menu-option.scheme';

@Component({
  selector: 'app-option-menu',
  templateUrl: 'option-menu.component.html',
  styleUrls: ['option-menu.component.css']
})
export class OptionMenuComponent {
  public data = { id: null, options: null };

  constructor(private dynamicService: DynamicService) {
  }

  public close(): void {
    this.dynamicService.removeDynamic(this.data.id);
  }

  private onMenuOptionClicked(option: MenuOptionScheme): void {
    option.action();
    this.close();
  }
}
