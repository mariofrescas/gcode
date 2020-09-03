import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppGlobal } from 'src/app/app.global';
import { DataService } from '@core/data/data.service';
import { CommonService } from '@core/api/common.service';
import { TreeItemModel } from '@core/models/tree-item.model';
import { DynamicService } from '@core/state/dynamic.service';
import { PlatformService } from '@core/backend/platform.service';
import { MenuOptionScheme } from '@shared/schemes/menu-option.scheme';
import { InputComponent } from '@shared/components/input/input.component';
import { MenuOptionType, MenuOptionsService } from '@core/util/menu-options.service';
import { OptionMenuComponent } from '@shared/components/option-menu/option-menu.component';

interface State {
  item: TreeItemModel;
  items: TreeItemModel[];
  mode: string;
}

@Injectable()
export class BrowserService {
  public state: State = { item: null, items: null, mode: null };

  constructor(
    private router: Router,
    private location: Location,
    private dataService: DataService,
    private commonService: CommonService,
    private dynamicService: DynamicService,
    private platformService: PlatformService,
    private menuOptionsService: MenuOptionsService) {
  }

  public loadState(ownerId: number): void {
    this.loadItem(ownerId);
    this.loadItemsOf(ownerId);
  }

  public loadItem(ownerId: number): void {
    this.dataService.getItem(ownerId)
    .then((item: TreeItemModel) => {
      this.state.item = item;
      this.state.mode = (item.owner || item.owner === 0) ? 'navigation' : 'root';
      this.platformService.setStatusBarColor(item.data.color.border);
    })
    .catch((error) => {
      alert(error);
    });
  }

  public loadItemsOf(ownerId: number): void {
    this.dataService.getItemsOf(ownerId)
    .then((items) => {
      this.state.items = items;
    })
    .catch((error) => {
      alert(error);
    });
  }

  public openAddItemDialog(): void {
    const item: TreeItemModel = {
      id: null,
      owner: this.state.item.id,
      sequence: this.state.item.data.children + 1,
      data: {
        description: '',
        content: '',
        children: 0,
        color: this.state.item.data.color,
        nchars: 0
      }
    };

    this.dynamicService.addDynamic (
      AppGlobal.DynamicInput,
      {
        description: '',
        modal: { title: 'Crear', content: 'Ingresa el nombre' },
        actions: {
          accept: (name) => {
            item.data.description = name;

            this.dataService.saveItem(item)
            .then((itemId) => {
              item.id = itemId;
              this.dynamicService.removeDynamic(AppGlobal.DynamicInput);
              this.state.items.push(item);
            })
            .catch((error) => {
              alert(error);
            });
          },
          cancel: () => {
            this.dynamicService.removeDynamic(AppGlobal.DynamicInput);
          }
        }
      },
      InputComponent
    );
  }

  public openTitleMenu(): void {
    if (this.state.mode === 'selection') {
      return;
    }

    const titleOptions: MenuOptionScheme[] = [];
    titleOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Open, () => {
      this.commonService.openItem(this.state.item);
    }));
    titleOptions.push(this.menuOptionsService.makeOption(MenuOptionType.SelectMode, () => {
      this.commonService.setSelectMode(this.state);
    }));
    titleOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Colors, () => {
      this.commonService.openColorsDialog([this.state.item], true);
    }));
    titleOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Rename, () => {
      this.commonService.openRenameDialog(this.state.item);
    }));
    titleOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Delete, () => {
      this.commonService.openDeleteDialog([this.state.item], this.state.items, true);
    }));

    this.dynamicService.addDynamic (
      AppGlobal.DynamicTreeItemOptions,
      { id: AppGlobal.DynamicTreeItemOptions, options: titleOptions },
      OptionMenuComponent
    );
  }

  public openLugerMenu(): void {
    if (this.state.mode === 'selection') {
      return;
    }

    const lugerOptions: MenuOptionScheme[] = [];
    lugerOptions.push(this.menuOptionsService.makeOption(MenuOptionType.SelectMode, () => {
      this.commonService.setSelectMode(this.state);
    }));

    this.dynamicService.addDynamic (
      AppGlobal.DynamicTreeItemOptions,
      { id: AppGlobal.DynamicTreeItemOptions, options: lugerOptions },
      OptionMenuComponent
    );
  }

  public openSelectionMenu(): void {
    const selectedItems: TreeItemModel[] = [];
    for (const item of this.state.items) {
      if (item.data.selected) {
        selectedItems.push(item);
      }
    }
    const selectedOptions: MenuOptionScheme[] = [];
    selectedOptions.push(this.menuOptionsService.makeOption(MenuOptionType.SelectAll, () => {
      this.commonService.selectAllItems(this.state.items);
    }));
    selectedOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Colors, () => {
      this.commonService.openColorsDialog(selectedItems, false);
    }));
    selectedOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Delete, () => {
        this.commonService.openDeleteDialog(selectedItems, this.state.items, false);
    }));

    this.dynamicService.addDynamic (
      AppGlobal.DynamicTreeItemOptions,
      { id: AppGlobal.DynamicTreeItemOptions, options: selectedOptions },
      OptionMenuComponent
    );
  }

  public openItemMenu(item: TreeItemModel): void {
    if (this.state.mode !== 'selection') {
      const itemOptions: MenuOptionScheme[] = [];
      itemOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Colors, () => {
        this.commonService.openColorsDialog([item], false);
      }));
      itemOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Rename, () => {
        this.commonService.openRenameDialog(item);
      }));
      itemOptions.push(this.menuOptionsService.makeOption(MenuOptionType.Delete, () => {
        this.commonService.openDeleteDialog([item], this.state.items, false);
      }));

      this.dynamicService.addDynamic(
        AppGlobal.DynamicTreeItemOptions,
        { id: AppGlobal.DynamicTreeItemOptions, options: itemOptions },
        OptionMenuComponent
      );
    } else {
      this.selectItem(item);
    }
  }

  public cancelItemsSelection(): void {
    let newMode = 'root';
    if (this.state.item.owner !== null) {
      newMode = 'navigation';
    }
    this.state.mode = newMode;

    for (const item of this.state.items) {
      item.data.selected = false;
    }
  }

  public sortItems(items: TreeItemModel[]): void {
    this.dataService.sortChildren(items)
    .then(() => {
    })
    .catch((error) => {
      alert(error);
    });
  }

  public editItem(item: TreeItemModel): void {
    if (this.state.mode !== 'selection') {
      this.router.navigate(['editor', item.id]);
    } else {
      this.selectItem(item);
    }
  }

  public forwardItem(item: TreeItemModel): void {
    this.router.navigate(['browser', item.id]);
  }

  public backItem(): void {
    this.location.back();
  }

  public selectItem(item: TreeItemModel): void {
    item.data.selected = !item.data.selected;
  }
}
