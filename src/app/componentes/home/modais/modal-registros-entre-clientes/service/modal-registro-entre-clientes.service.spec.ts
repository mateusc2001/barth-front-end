import { TestBed } from '@angular/core/testing';

import { ModalRegistroEntreClientesService } from './modal-registro-entre-clientes.service';

describe('ModalRegistroEntreClientesService', () => {
  let service: ModalRegistroEntreClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalRegistroEntreClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
