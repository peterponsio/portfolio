import { TestBed } from '@angular/core/testing';

import { GemetryService } from './gemetry.service';

describe('GemetryService', () => {
  let service: GemetryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GemetryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
