import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent {
  @Output() click = new EventEmitter<void>();

  public onClick(): void {
    this.click.emit();
  }
}
