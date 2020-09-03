import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppGlobal } from 'src/app/app.global';
import { DataService } from '@core/data/data.service';
import { ColorModel } from '@core/models/color.model';
import { TreeItemModel } from '@core/models/tree-item.model';
import { DynamicService } from '@core/state/dynamic.service';
import { PlatformService } from '@core/backend/platform.service';
import { InputComponent } from '@shared/components/input/input.component';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';

@Injectable()
export class CommonService {
  constructor(
    private router: Router,
    private location: Location,
    private dataService: DataService,
    private dynamicService: DynamicService,
    private platformService: PlatformService) {
  }

  public openItem(item: TreeItemModel): void {
    this.router.navigate(['editor', item.id]);
  }

  public setSelectMode(state: any): void {
    state.mode = 'selection';
  }

  public selectAllItems(items: TreeItemModel[]): void {
    for (const item of items) {
      item.data.selected = true;
    }
  }

  public openColorsDialog(items: TreeItemModel[], fromHeader: boolean): void {
    if (items.length < 1) {
      alert('Selecciona una opción');
      return;
    }

    this.dataService.getColors()
    .then((colors: ColorModel[]) => {
      this.dynamicService.addDynamic (
        AppGlobal.DynamicColorPicker,
        {
          item: items[0],
          selected: (items.length < 2) ? true : false,
          colors,
          actions: {
            accept: async (color) => {
              for (const item of items) {
                item.data.color = color;
                try {
                  await this.dataService.setItem(item);
                } catch (error) {
                  alert(error);
                }
              }
              if (fromHeader) {
                this.platformService.setStatusBarColor(items[0].data.color.border);
              }
              this.dynamicService.removeDynamic(AppGlobal.DynamicColorPicker);
            },
            cancel: () => {
              this.dynamicService.removeDynamic(AppGlobal.DynamicColorPicker);
            }
          }
        },
        ColorPickerComponent
      );
    })
    .catch((error) => {
      alert(error);
    });

  }

  public openRenameDialog(item: TreeItemModel): void {
    this.dynamicService.addDynamic (
      AppGlobal.DynamicInput,
      {
        description: item.data.description,
        modal: { title: 'Renombrar', content: 'Ingresa el nuevo nombre' },
        actions: {
          accept: (name) => {
            item.data.description = name;
            this.dataService.setItem(item);
            this.dynamicService.removeDynamic(AppGlobal.DynamicInput);
          },
          cancel: () => {
            this.dynamicService.removeDynamic(AppGlobal.DynamicInput);
          }
        }
      },
      InputComponent
    );
  }

  public openDeleteDialog(items: TreeItemModel[], tree: TreeItemModel[], fromHeader: boolean): void {
    if (items.length < 1) {
      alert('Selecciona una opción');
      return;
    }

    this.dynamicService.addDynamic (
      AppGlobal.DynamicConfirm,
      {
        modal: { title: 'Eliminar', content: 'También se eliminarán las subnotas. ¿Está seguro de continuar?' },
        actions: {
          accept: async () => {
            for (const item of items) {
              try {
                await this.dataService.deleteItem(item.id);
                if (fromHeader) {
                  this.location.back();
                } else {
                  const index = tree.indexOf(item);
                  if (index !== -1) {
                    tree.splice(index, 1);
                  }
                }
              } catch (error) {
                alert(error);
              }
            }
            this.dynamicService.removeDynamic(AppGlobal.DynamicConfirm);
          },
          cancel: () => {
            this.dynamicService.removeDynamic(AppGlobal.DynamicConfirm);
          }
        }
      },
      ConfirmComponent
    );
  }
}
