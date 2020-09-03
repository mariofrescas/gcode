import { Component } from '@angular/core';

import { ColorModel } from '@core/models/color.model';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  public data = { item: null, selected: null, colors: null, actions: null};

  private isSelectedColorCss(color: ColorModel): string {
    if (this.data.selected && color.id === this.data.item.data.color.id) {
      return '0 0 5px 2px #0081ff';
    } else {
      return 'none';
    }
  }

  public onCancelClick(): void {
    this.data.actions.cancel();
  }

  public onColorClick(color: ColorModel): void {
    this.data.actions.accept(color);
  }
}
