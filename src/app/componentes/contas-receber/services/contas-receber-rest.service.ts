import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasReceberRestService {

  constructor(private httpClient: HttpClient) { }

  public getContasReceberFixas(pageOptions: any): Observable<any> {
    return this.httpClient.get(`http://localhost:1900/receber/fixas/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }

  public getContasReceberVariaveis(pageOptions: any): Observable<any> {
    return this.httpClient.get(`http://localhost:1900/receber/variaveis/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }

  public novaContaPagar(request: any): Observable<any> {
    return this.httpClient.post(`http://localhost:1900/receber`, request);
  }

  public finalizar(id: any): Observable<any> {
    return this.httpClient.patch(`http://localhost:1900/receber/finalizar/${id}`, {});
  }
}
