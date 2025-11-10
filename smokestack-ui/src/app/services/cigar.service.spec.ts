import { TestBed } from '@angular/core/testing';

import { CigarService } from './cigar.service';

describe('CigarService', () => {
  let service: CigarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CigarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
