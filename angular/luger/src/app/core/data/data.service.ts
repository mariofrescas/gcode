import { Injectable } from '@angular/core';

import { ColorModel } from '@core/models/color.model';
import { FileService } from '@core/backend/file.service';
import { TreeItemModel } from '@core/models/tree-item.model';
import { DatabaseService } from '@core/backend/database.service';

@Injectable()
export class DataService {
  constructor(
    private databaseService: DatabaseService,
    private fileService: FileService) {
  }

  public loadItem(itemId: number): Promise<TreeItemModel> {
    return new Promise<TreeItemModel>((resolve, reject) => {
      this.databaseService.getItem(itemId)
      .then((item: TreeItemModel) => {
        this.fileService.load(String(itemId))
        .then((content: string | ArrayBuffer) => {
          item.data.content = content;
          resolve(item);
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public saveItem(item: TreeItemModel): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.databaseService.setItem(item)
      .then((itemId) => {
        this.fileService.store(String(itemId), item.data.content)
        .then(() => {
          resolve(itemId);
        })
        .then((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public deleteItem(itemId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getChildren(itemId)
      .then((items) => {
        const childrenIds: number[] = [];

        for (const item of items) {
          childrenIds.push(item.id);
        }

        this.databaseService.deleteItem(itemId, childrenIds)
        .then(async () => {
          childrenIds.push(itemId);

          for (const item of childrenIds) {
            try {
              await this.fileService.delete(String(item));
            } catch (error) {
              reject(error);
            }
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public getItem(itemId: number): Promise<TreeItemModel> {
    return this.databaseService.getItem(itemId);
  }

  public setItem(item: TreeItemModel): Promise<number> {
    return this.databaseService.setItem(item);
  }

  public getItemsOf(ownerId: number): Promise<TreeItemModel[]> {
    return this.databaseService.getItemsOf(ownerId);
  }

  public getChildren(itemId: number): Promise<TreeItemModel[]> {
    return this.databaseService.getChildren(itemId);
  }

  public getColors(): Promise<ColorModel[]> {
    return this.databaseService.getColors();
  }

  public sortChildren(items: TreeItemModel[]): Promise<void> {
    return this.databaseService.sortChildren(items);
  }
}
