import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContasReceberRestService {

  constructor(private httpClient: HttpClient) { }

  public getContasReceberFixas(pageOptions: any): Observable<any> {
    return this.httpClient.get(`${environment.financeiro_service_url}/conta/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}?contaPagar=false&contaFixa=true`);
  }

  public getContasReceberVariaveis(pageOptions: any): Observable<any> {
    return this.httpClient.get(`${environment.financeiro_service_url}/conta/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}?contaPagar=false&contaFixa=false`);
  }

  public novaContaPagar(request: any): Observable<any> {
    return this.httpClient.post(`${environment.financeiro_service_url}/conta`, request);
  }

  public finalizar(id: any): Observable<any> {
    return this.httpClient.patch(`${environment.financeiro_service_url}/conta/finalizar/${id}`, {});
  }
}
