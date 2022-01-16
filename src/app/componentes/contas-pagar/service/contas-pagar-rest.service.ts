import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasPagarRestService {

  constructor(private httpClient: HttpClient) {
  }

  public getContasPagarFixas(pageOptions: any): Observable<any> {
    return this.httpClient.get(`http://localhost:1900/pagar/fixas/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }

  public getContasPagarVariaveis(pageOptions: any): Observable<any> {
    return this.httpClient.get(`http://localhost:1900/pagar/variaveis/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }

  public novaContaPagar(request: any): Observable<any> {
    return this.httpClient.post(`http://localhost:1900/pagar`, request);
  }

  public finalizar(id: any): Observable<any> {
    return this.httpClient.patch(`http://localhost:1900/pagar/finalizar/${id}`, {});
  }
}
