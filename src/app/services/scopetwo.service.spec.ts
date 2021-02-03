import { TestBed } from '@angular/core/testing';

import { ScopetwoService } from './scopetwo.service';

describe('ScopetwoService', () => {
  let service: ScopetwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopetwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
