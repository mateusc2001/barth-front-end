import { TestBed } from '@angular/core/testing';

import { ContasReceberRestService } from './contas-receber-rest.service';

describe('ContasReceberRestService', () => {
  let service: ContasReceberRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasReceberRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
