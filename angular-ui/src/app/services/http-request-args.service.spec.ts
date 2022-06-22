import { TestBed } from '@angular/core/testing';

import { HttpRequestArgsService } from './http-request-args.service';

describe('HttpRequestArgsService', () => {
  let service: HttpRequestArgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestArgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
