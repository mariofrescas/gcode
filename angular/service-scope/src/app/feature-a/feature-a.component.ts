import { Component, OnInit } from '@angular/core';

import { FeatureBService } from '../feature-b/feature-b.service';
import { FeatureAService } from './feature-a.service';

@Component({
  selector: 'app-feature-a',
  templateUrl: './feature-a.component.html',
  styleUrls: ['./feature-a.component.css'],
  viewProviders: [FeatureAService]
})
export class FeatureAComponent implements OnInit {

  constructor(
    private featureaService: FeatureAService,
    private featurebService: FeatureBService
  ) { }

  ngOnInit(): void {
    this.featureaService.action();
  }

}
