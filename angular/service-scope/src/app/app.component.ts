import { Component } from '@angular/core';

import { FeatureBService } from './feature-b/feature-b.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private featurebService: FeatureBService
  ) { }
}
