import { TestBed } from '@angular/core/testing';

import { PlanosRestService } from './planos-rest.service';

describe('PlanosRestService', () => {
  let service: PlanosRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanosRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
