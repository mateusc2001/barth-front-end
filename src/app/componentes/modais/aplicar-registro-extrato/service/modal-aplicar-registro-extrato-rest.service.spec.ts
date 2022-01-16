import { TestBed } from '@angular/core/testing';

import { ModalAplicarRegistroExtratoRestService } from './modal-aplicar-registro-extrato-rest.service';

describe('ModalAplicarRegistroExtratoRestService', () => {
  let service: ModalAplicarRegistroExtratoRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalAplicarRegistroExtratoRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
