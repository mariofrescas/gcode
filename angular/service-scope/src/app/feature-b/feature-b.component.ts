import { Component, OnInit } from '@angular/core';

import { FeatureBService } from './feature-b.service';

@Component({
  selector: 'app-feature-b',
  templateUrl: './feature-b.component.html',
  styleUrls: ['./feature-b.component.css'],
  //viewProviders: [FeatureBService]
})
export class FeatureBComponent implements OnInit {

  constructor(
    private featurebService: FeatureBService
  ) { }

  ngOnInit(): void {
    this.featurebService.action();
  }

}
