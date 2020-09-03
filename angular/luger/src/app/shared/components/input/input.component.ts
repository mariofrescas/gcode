import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent  {
  public data = { description: '', modal: { title: '', content: '' }, actions: null };

  public onAcceptClick(): void {
    this.data.actions.accept(this.data.description);
  }

  public onCancelClick(): void {
    this.data.actions.cancel();
  }
}
