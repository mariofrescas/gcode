import { Injectable } from '@angular/core';

declare let window: any;

@Injectable()
export class FileService {
  public load(file: string): Promise<string | ArrayBuffer > {
    return new Promise((resolve, reject) => {
      window.requestFileSystem (
        window.LocalFileSystem.PERSISTENT, 0,
        (fs) => {
          fs.root.getFile (
            file, { create: false, exclusive: false },
            (fileEntry) => {
              fileEntry.file (
                (f) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.readAsText(f);
                },
                (error) => {
                  reject('Error: load -> fileEntry.file ~ ' + error.toString());
                }
              );
            },
            (error) => {
              reject('Error: load -> fs.root.getFile ~ ' + error.toString());
            }
          );
        },
        (error) => {
          reject('Error: load -> this.window().requestFileSystem ~ ' + error.toString());
        }
      );
    });
  }

  public store(file: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      window.requestFileSystem (
        window.LocalFileSystem.PERSISTENT, 0,
        (fs) => {
          fs.root.getFile (
            file, { create: true, exclusive: false },
            (fileEntry) => {
              fileEntry.createWriter((fileWriter) => {
                fileWriter.onwriteend = () => resolve();
                fileWriter.onerror = (error) => reject('Error: fileWriter.write(data); ~ ' + error.toString());

                fileWriter.write(data);
              });
            },
            (error) => {
              reject('Error: store -> fs.root.getFile ~ ' + error.toString());
            }
          );
        },
        (error) => {
          reject('Error: store -> this.window().requestFileSystem ~ ' + error.toString());
        }
      );
    });
  }

  public delete(file: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      window.requestFileSystem (
        window.LocalFileSystem.PERSISTENT, 0,
        (fs) => {
          fs.root.getFile (
            file, { create: false, exclusive: false },
            (fileEntry) => {
              fileEntry.remove (
                () => resolve(),
                (error) => reject('Error: delete -> fileEntry.remove ~ ' + error.toString())
              );
            },
            (error) => {
              reject('Error: delete -> fs.root.getFile ~ ' + error.toString());
            }
          );
        },
        (error) => {
          reject('Error: delete -> this.window().requestFileSystem ~ ' + error.toString());
        }
      );
    });
  }
}
