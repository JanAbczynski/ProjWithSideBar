import { TestBed } from '@angular/core/testing';

import { ShootingRangeService } from './shooting-range.service';

describe('ShootingRangeService', () => {
  let service: ShootingRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShootingRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
