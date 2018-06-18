import { TestBed, inject } from '@angular/core/testing';

import { GroupStoreService } from './group-store.service';

describe('GroupStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupStoreService]
    });
  });

  it('should be created', inject([GroupStoreService], (service: GroupStoreService) => {
    expect(service).toBeTruthy();
  }));
});
