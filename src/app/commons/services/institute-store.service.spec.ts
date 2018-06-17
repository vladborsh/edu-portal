import { TestBed, inject } from '@angular/core/testing';

import { InstituteStoreService } from './institute-store.service';

describe('InstituteStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstituteStoreService]
    });
  });

  it('should be created', inject([InstituteStoreService], (service: InstituteStoreService) => {
    expect(service).toBeTruthy();
  }));
});
