import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalAplicarRegistroExtratoRestService {

  constructor(private httpClient: HttpClient) { }

  public buscarUsuarios(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:1900/users');
  }
}
