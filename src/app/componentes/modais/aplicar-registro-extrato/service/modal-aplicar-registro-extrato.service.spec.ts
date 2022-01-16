import { TestBed } from '@angular/core/testing';

import { ModalAplicarRegistroExtratoService } from './modal-aplicar-registro-extrato.service';

describe('ModalAplicarRegistroExtratoService', () => {
  let service: ModalAplicarRegistroExtratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalAplicarRegistroExtratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
