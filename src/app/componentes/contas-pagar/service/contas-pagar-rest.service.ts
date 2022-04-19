import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContasPagarRestService {

  constructor(private httpClient: HttpClient) {
  }

  public getContasPagarFixas(pageOptions: any): Observable<any> {
    return this.httpClient.get(`${environment.financeiro_service_url}/conta/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}?contaPagar=true&contaFixa=true`);
  }

  public getContasPagarVariaveis(pageOptions: any): Observable<any> {
    return this.httpClient.get(`${environment.financeiro_service_url}/conta/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}?contaPagar=true&contaFixa=false`);
  }

  public novaContaPagar(request: any): Observable<any> {
    return this.httpClient.post(`${environment.financeiro_service_url}/conta`, request);
  }

  public finalizar(id: any): Observable<any> {
    return this.httpClient.patch(`${environment.financeiro_service_url}/conta/finalizar/${id}`, {});
  }
}
