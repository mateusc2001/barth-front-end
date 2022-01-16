import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalAplicarRegistroExtratoRestService } from './modal-aplicar-registro-extrato-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ModalAplicarRegistroExtratoService {

  constructor(private modalAplicarRegistroExtratoRestService: ModalAplicarRegistroExtratoRestService) { }

  public buscarUsuarios(): Observable<any[]> {
    return this.modalAplicarRegistroExtratoRestService.buscarUsuarios();
  }
}
