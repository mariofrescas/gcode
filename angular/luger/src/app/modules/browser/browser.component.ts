import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { TreeItemModel } from '@core/models/tree-item.model';
import { BrowserService } from '@modules/browser/browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: 'browser.component.html',
  styleUrls: ['browser.component.css'],
  providers: [BrowserService]
})
export class BrowserComponent implements OnInit, OnDestroy {
  private unsubParamMap = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    public browserService: BrowserService) {
  }

  public ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.unsubParamMap))
    .subscribe((params) => {
      const ownerId = Number(params.get('ownerId'));
      this.browserService.loadState(ownerId);
    });
  }

  public ngOnDestroy(): void {
    this.unsubParamMap.next();
    this.unsubParamMap.complete();
  }

  private onBackClick(): void {
    this.browserService.backItem();
  }

  private onCancelSelectionClick(): void {
    this.browserService.cancelItemsSelection();
  }

  private onTitleClick(): void {
    this.browserService.openTitleMenu();
  }

  private onLugerClick(): void {
    this.browserService.openLugerMenu();
  }

  private onAddClick(): void {
    this.browserService.openAddItemDialog();
  }

  private onOptionsSelectionClick(): void {
    this.browserService.openSelectionMenu();
  }

  private onItemsSort(items: TreeItemModel[]): void {
    this.browserService.sortItems(items);
  }

  private onItemOptionsClick(item: TreeItemModel): void {
    this.browserService.openItemMenu(item);
  }

  private onItemClick(item: TreeItemModel): void {
    this.browserService.editItem(item);
  }

  private onItemForwardClick(item: TreeItemModel): void {
    this.browserService.forwardItem(item);
  }

  private onItemSelectClick(item: TreeItemModel): void {
    this.browserService.selectItem(item);
  }
}
