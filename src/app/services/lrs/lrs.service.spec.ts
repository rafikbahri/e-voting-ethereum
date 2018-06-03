import { TestBed, inject } from '@angular/core/testing';

import { LrsService } from './lrs.service';

describe('LrsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LrsService]
    });
  });

  it('should be created', inject([LrsService], (service: LrsService) => {
    expect(service).toBeTruthy();
  }));
});
