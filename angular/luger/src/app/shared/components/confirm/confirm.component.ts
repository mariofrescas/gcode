import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  public data = { modal: { title: '', content: '' }, actions: null };

  public onAcceptClick(): void {
    this.data.actions.accept();
  }

  public onCancelClick(): void {
    this.data.actions.cancel();
  }
}
