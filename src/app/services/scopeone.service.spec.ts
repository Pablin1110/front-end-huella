import { TestBed } from '@angular/core/testing';

import { ScopeoneService } from './scopeone.service';

describe('ScopeoneService', () => {
  let service: ScopeoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopeoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
