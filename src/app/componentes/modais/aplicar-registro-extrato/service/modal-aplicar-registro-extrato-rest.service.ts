import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalAplicarRegistroExtratoRestService {

  constructor(private httpClient: HttpClient) { }

  public buscarUsuarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.financeiro_service_url}/usuario`);
  }
}
