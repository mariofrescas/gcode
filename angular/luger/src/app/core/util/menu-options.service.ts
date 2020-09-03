import { Injectable } from '@angular/core';

import { MenuOptionScheme } from '@shared/schemes/menu-option.scheme';

export enum MenuOptionType {
  Open, SelectMode, SelectAll,
  Colors, Tags, Date, Highlight,
  Lock, Share, Move, Rename, Delete
}

@Injectable()
export class MenuOptionsService {
  public makeOption(type: MenuOptionType, action: () => void): MenuOptionScheme {
    switch (type) {
      case MenuOptionType.Open: {
        return {
          text: 'Abrir',
          icon: 'import_contacts',
          action
        };
      }
      case MenuOptionType.SelectMode: {
        return {
          text: 'Seleccionar',
          icon: 'check_box_outline_blank',
          action
        };
      }
      case MenuOptionType.SelectAll: {
        return {
          text: 'Seleccionar todo',
          icon: 'done_all',
          action
        };
      }
      case MenuOptionType.Colors: {
        return {
          text: 'Cambiar color',
          icon: 'color_lens',
          action
        };
      }
      case MenuOptionType.Tags: {
        return {
          text: 'Etiquetas',
          icon: 'label',
          action
        };
      }
      case MenuOptionType.Date: {
        return {
          text: 'Cambiar fecha',
          icon: 'date_range',
          action
        };
      }
      case MenuOptionType.Highlight: {
        return {
          text: 'Destacar',
          icon: 'star',
          action
        };
      }
      case MenuOptionType.Lock: {
        return {
          text: 'Esconder',
          icon: 'lock',
          action
        };
      }
      case MenuOptionType.Share: {
        return {
          text: 'Compartir',
          icon: 'share',
          action
        };
      }
      case MenuOptionType.Move: {
        return {
          text: 'Mover',
          icon: 'send',
          action
        };
      }
      case MenuOptionType.Rename: {
        return {
          text: 'Renombrar',
          icon: 'edit',
          action
        };
      }
      case MenuOptionType.Delete: {
        return {
          text: 'Eliminar',
          icon: 'delete',
          action
        };
      }
    }
  }
}
