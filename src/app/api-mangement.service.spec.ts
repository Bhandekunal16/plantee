import { TestBed } from '@angular/core/testing';

import { ApiManagementService } from './api-mangement.service';

describe('ApiMangementService', () => {
  let service: ApiManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
