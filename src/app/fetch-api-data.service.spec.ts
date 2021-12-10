import { TestBed } from '@angular/core/testing';

import { UserService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
