import { TestBed, inject } from '@angular/core/testing';

import { SpecialityStoreService } from './speciality-store.service';

describe('SpecialityStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityStoreService]
    });
  });

  it('should be created', inject([SpecialityStoreService], (service: SpecialityStoreService) => {
    expect(service).toBeTruthy();
  }));
});
