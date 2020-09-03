import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ColorModel } from '@core/models/color.model';
import { TreeItemModel } from '@core/models/tree-item.model';

declare let window: any;

@Injectable()
export class DatabaseService {
  private db: any;
  private dbReady: BehaviorSubject<boolean>;

  constructor() {
    this.dbReady = new BehaviorSubject<boolean>(false);
    this.iniDatabase();
  }

  private isReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.dbReady.getValue()) {
        resolve();
      } else {
        this.dbReady.subscribe((value) => {
          if (value) {
            resolve();
          }
        });
      }
    });
  }

  private iniDatabase(): void {
    this.db = window.sqlitePlugin.openDatabase (
      { name: 'luger', location: 'default' },
      (db) => {
        this.createTables();
      },
      (error) => {
        console.log('ERROR: openDatabase -> ' + error.message);
      }
    );
  }

  private closeDatabase(): void {
    this.db.close (
      (db) => {
        this.dbReady.next(false);
      },
      (error) => {
        this.dbReady.next(false);
        console.log('ERROR: closeDatabase -> ' + error.message);
      }
    );
  }

  private createTables(): void {
    this.db.transaction (
      (tx) => {
        tx.executeSql (`
          create table if not exists items (
            id integer primary key autoincrement,
            owner integer,
            sequence integer,
            description text,
            children integer,
            color integer,
            nchars integer
          )`
        );

        tx.executeSql (
          'insert or ignore into items(id, owner, sequence, description, children, color, nchars) values(?, ?, ?, ?, ?, ?, ?)',
          [0, null, 0, 'Luger', 0, 0, 0]
        );

        tx.executeSql (`
          create table if not exists colors (
            id integer primary key autoincrement,
            category integer,
            text text,
            background text,
            border text
          )`
        );

        // Defecto: Azul
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [0, 1, '#ffffff', '#3f51b5', '#303e8b']
        );

        // Verde
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [1, 1, '#ffffff', '#3fb553', '#328f41']
        );

        // Rojo
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [2, 1, '#ffffff', '#b53f3f', '#8b3030']
        );

        // Morado
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [3, 1, '#ffffff', '#803fb5', '#65308b']
        );

        // Amarillo
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [4, 1, '#ffffff', '#cecb5e', '#b3b049']
        );

        // Naranja
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [5, 1, '#ffffff', '#b5793f', '#8b4e30']
        );

        // Cian
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [6, 1, '#ffffff', '#3fb5ad', '#308a8b']
        );

        // Rosa
        tx.executeSql (
          'insert or ignore into colors(id, category, text, background, border) values(?, ?, ?, ?, ?)',
          [7, 1, '#ffffff', '#b53f99', '#8b3077']
        );
      },
      (error) => {
        console.log('ERROR: createTables -> ' + error.message);
      },
      () => {
        this.dbReady.next(true);
      }
    );
  }

  public getItem(itemId: number): Promise<TreeItemModel> {
    let item: TreeItemModel;

    return new Promise<TreeItemModel>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            tx.executeSql (`
              select i.id, i.owner, i.sequence, i.description, i.children, i.color, i.nchars,
                     c.category, c.text, c.background, c.border
              from items i inner join colors c on c.id = i.color
              where i.id = ?`,
              [itemId],
              (t, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                  const citem = result.rows.item(i);

                  item = {
                    id: citem.id,
                    owner: citem.owner,
                    sequence: citem.sequence,
                    data: {
                      description: citem.description,
                      children: citem.children,
                      color: {
                        id: citem.color,
                        category: citem.category,
                        text: citem.text,
                        background: citem.background,
                        border: citem.border
                      },
                      nchars: citem.nchars
                    },
                  };
                }
              }
            );
          },
          (error) => {
            reject('ERROR: getItem -> ' + error.message);
          },
          () => {
            resolve(item);
          }
        );
      });
    });
  }

  public setItem(item: TreeItemModel): Promise<number> {
    let itemId = -1;

    return new Promise<number>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            if (item.id) {
              tx.executeSql (
                'update items set owner = ?, sequence = ?, description = ?, children = ?, color = ?, nchars = ? where id = ?',
                [item.owner, item.sequence, item.data.description, item.data.children, item.data.color.id, item.data.nchars, item.id],
                (t, result) => {
                  itemId = item.id;
                }
              );
            } else {
              tx.executeSql (
                'insert into items(owner, sequence, description, children, color, nchars) values(?, ?, ?, ?, ?, ?)',
                [item.owner, item.sequence, item.data.description, item.data.children, item.data.color.id, item.data.nchars],
                (t, result) => {
                  itemId = result.insertId;
                }
              );

              tx.executeSql('update items set children = children + 1 where id = ?', [item.owner]);
            }
          },
          (error) => {
            reject('ERROR: setItem -> ' + error.message);
          },
          () => {
            resolve(itemId);
          }
        );
      });
    });
  }

  public deleteItem(itemId: number, childrenIds: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            tx.executeSql('update items set children = children - 1 where id = (select owner from items where id = ?)', [itemId]);
            tx.executeSql('delete from items where id in (' + childrenIds.toString() + ')');
            tx.executeSql('delete from items where id = ?', [itemId]);
          },
          (error) => {
            reject('Error: deleteItem -> ' + error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  }

  public getItemsOf(ownerId: number): Promise<TreeItemModel[]> {
    const items: TreeItemModel[] = [];

    return new Promise<TreeItemModel[]>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            tx.executeSql (`
              select i.id, i.owner, i.sequence, i.description, i.children, i.color, i.nchars,
                     c.category, c.text, c.background, c.border
              from items i inner join colors c on c.id = i.color
              where i.owner = ?
              order by i.sequence`,
              [ownerId],
              (t, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  items.push ({
                    id: item.id,
                    owner: item.owner,
                    sequence: item.sequence,
                    data: {
                      description: item.description,
                      children: item.children,
                      color: {
                        id: item.color,
                        category: item.category,
                        text: item.text,
                        background: item.background,
                        border: item.border
                      },
                      nchars: item.nchars
                    }
                  });
                }
              }
            );
          },
          (error) => {
            reject('Error: getItemsOf -> ' + error.message);
          },
          () => {
            resolve(items);
          }
        );
      });
    });
  }

  public getChildren(itemId: number): Promise<TreeItemModel[]> {
    const items: TreeItemModel[] = [];

    return new Promise<TreeItemModel[]>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            tx.executeSql(
              `with recursive tc(i)
              as (
                select id from items where owner = ?
                union select id from items, tc where items.owner = tc.i
              ) select * from items where id in tc`,
              [itemId],
              (t, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                  const item = result.rows.item(i);

                  items.push({
                    id: item.id,
                    owner: item.owner,
                    sequence: item.sequence,
                    data: {
                      description: item.description,
                      children: item.children,
                      color: {
                        id: item.color,
                        category: null,
                        text: null,
                        background: null,
                        border: null
                      },
                      nchars: item.nchars
                    }
                  });
                }
              }
            );
          },
          (error) => {
            reject('Error: getChildren -> ' + error.message);
          },
          () => {
            resolve(items);
          }
        );
      });
    });
  }

  public getColors(): Promise<ColorModel[]> {
    const colors: ColorModel[] = [];

    return new Promise<ColorModel[]>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            tx.executeSql (
              'select * from colors', [],
              (t, result) => {
                for (let i = 0; i < result.rows.length; i++) {
                  const color = result.rows.item(i);

                  colors.push({
                    id: color.id,
                    category: color.category,
                    text: color.text,
                    background: color.background,
                    border: color.border
                  });
                }
              }
            );
          },
          (error) => {
            reject('Error: getColors -> ' + error);
          },
          () => {
            resolve(colors);
          }
        );
      });
    });
  }

  public sortChildren(items: TreeItemModel[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isReady().then(() => {
        this.db.transaction (
          (tx) => {
            for (let i = 0; i < items.length; i++) {
              tx.executeSql('update items set sequence = ? where id = ?', [i, items[i].id]);
            }
          },
          (error) => {
            reject('Error: sortChildren -> ' + error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  }

  public logItemsTable(): void {
    this.isReady().then(() => {
      this.db.transaction (
        (tx) => {
          tx.executeSql (
            'select * from items', [],
            (t, result) => {
              for (let i = 0; i < result.rows.length; i++) {
                console.table(result.rows.item(i));
              }
            }
          );
        },
        (error) => {
          console.log('Error: logItemsTable -> ' + error);
        },
        () => {
          console.log('Success: logItemsTable');
        }
      );
    });
  }
}
