import { TestBed, inject } from '@angular/core/testing';

import { SubjectStoreService } from './subject-store.service';

describe('SubjectStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectStoreService]
    });
  });

  it('should be created', inject([SubjectStoreService], (service: SubjectStoreService) => {
    expect(service).toBeTruthy();
  }));
});
