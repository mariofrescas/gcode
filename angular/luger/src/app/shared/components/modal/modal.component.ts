import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() accept: boolean;
  @Input() cancel: boolean;

  @Output() acceptClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  private onAcceptClick(): void {
    this.acceptClick.emit();
  }

  private onCancelClick(): void {
    this.cancelClick.emit();
  }
}
