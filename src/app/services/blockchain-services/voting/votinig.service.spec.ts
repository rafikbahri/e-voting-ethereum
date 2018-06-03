import { TestBed, inject } from '@angular/core/testing';

import { VotinigService } from './votinig.service';

describe('VotinigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotinigService]
    });
  });

  it('should be created', inject([VotinigService], (service: VotinigService) => {
    expect(service).toBeTruthy();
  }));
});
