import { TestBed, inject } from '@angular/core/testing';

import { ElectionService } from './election.service';

describe('ElectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectionService]
    });
  });

  it('should be created', inject([ElectionService], (service: ElectionService) => {
    expect(service).toBeTruthy();
  }));
});
