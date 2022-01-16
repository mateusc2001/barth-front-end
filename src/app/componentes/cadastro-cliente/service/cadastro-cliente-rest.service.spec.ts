import { TestBed } from '@angular/core/testing';

import { CadastroClienteRestService } from './cadastro-cliente-rest.service';

describe('CadastroClienteRestService', () => {
  let service: CadastroClienteRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroClienteRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
