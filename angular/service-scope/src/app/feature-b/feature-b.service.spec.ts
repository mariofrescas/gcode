import { TestBed } from '@angular/core/testing';

import { FeatureBService } from './feature-b.service';

describe('FeatureBService', () => {
  let service: FeatureBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
