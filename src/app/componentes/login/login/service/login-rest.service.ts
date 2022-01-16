import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  constructor(private httpClient: HttpClient) { }

  public logar(obj: any): Observable<any> {
    return this.httpClient.post('http://localhost:1900/logar', obj);
  }

  public getContasComVencimentoHoje(): Observable<any> {
    return this.httpClient.get('http://localhost:1900/vencimento-hoje');
  }
}
