import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [EditorService]
})
export class EditorComponent implements OnInit, OnDestroy {
  private unsubParamMap = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    public editorService: EditorService) {
  }

  public ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.unsubParamMap))
    .subscribe((params) => {
      const itemId = params.get('itemId');
      this.editorService.loadState(itemId);
    });
  }

  public ngOnDestroy(): void {
    this.unsubParamMap.next();
    this.unsubParamMap.complete();
  }

  private onCloseClick(): void {
    this.editorService.closeEditor();
  }

  private onTitleClick(): void {
    this.editorService.openTitleMenu();
  }

  private onSaveClick(): void {
    this.editorService.saveItem();
  }
}
