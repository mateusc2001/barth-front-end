import { TestBed } from '@angular/core/testing';

import { CaixaRestService } from './caixa-rest.service';

describe('CaixaRestService', () => {
  let service: CaixaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
