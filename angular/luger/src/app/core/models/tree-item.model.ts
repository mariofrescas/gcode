import { ColorModel } from './color.model';

export class TreeItemModel {
  public id: number;
  public owner: number;
  public sequence: number;
  public data: {
    description: string,
    content?: string | ArrayBuffer,
    selected?: boolean,
    children: number,
    color: ColorModel,
    nchars: number
  };
}
