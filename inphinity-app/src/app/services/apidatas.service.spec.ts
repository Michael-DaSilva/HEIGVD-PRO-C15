import { TestBed } from '@angular/core/testing';

import { APIDatasService } from './apidatas.service';

describe('APIDatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIDatasService = TestBed.get(APIDatasService);
    expect(service).toBeTruthy();
  });
});
