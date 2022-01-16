import { TestBed } from '@angular/core/testing';

import { ContasPagarRestService } from './contas-pagar-rest.service';

describe('ContasPagarRestService', () => {
  let service: ContasPagarRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasPagarRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
