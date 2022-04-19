import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {

  constructor(private httpClient: HttpClient) { }

  public logar(obj: any): Observable<any> {
    return this.httpClient.post(`${environment.financeiro_service_url}/login`, obj);
  }

  public getContasComVencimentoHoje(): Observable<any> {
    return this.httpClient.get(`${environment.financeiro_service_url}/conta/vencimento/hoje`);
  }
}
