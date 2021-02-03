import { TestBed } from '@angular/core/testing';

import { FeatureAService } from './feature-a.service';

describe('FeatureAService', () => {
  let service: FeatureAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
