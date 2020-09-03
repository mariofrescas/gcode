import { Injectable } from '@angular/core';

import { Location } from '@angular/common';
import { DataService } from '@core/data/data.service';
import { TreeItemModel } from '@core/models/tree-item.model';
import { PlatformService } from '@core/backend/platform.service';

interface State {
  item: TreeItemModel;
}

@Injectable()
export class EditorService {
  public state: State = { item: null };

  constructor(
    private location: Location,
    private dataService: DataService,
    private platformService: PlatformService) {
  }

  public loadState(itemId: string): void {
    this.loadItem(itemId);
  }

  public loadItem(itemId: string): void {
    this.dataService.loadItem(Number(itemId))
    .then((item: TreeItemModel) => {
      this.state.item = item;
      this.platformService.setStatusBarColor(item.data.color.border);
    })
    .catch((error) => {
      alert(error);
    });
  }

  public closeEditor(): void {
    this.location.back();
  }

  public openTitleMenu(): void {
    alert('TODO: openTitleMenu');
  }

  public saveItem(): void {
    const content = this.state.item.data.content;
    if (content) {
      this.state.item.data.nchars = content.toString().length;
      this.state.item.data.content = content.toString().replace(/<p><br><\/p>/gi, '<br>');
    } else {
      this.state.item.data.nchars = 0;
      this.state.item.data.content = '';
    }

    this.dataService.saveItem(this.state.item)
    .then((itemId) => {
      this.state.item.id = itemId;
      alert('saved:' + itemId);
    })
    .catch((error) => {
      alert(error);
    });
  }
}
