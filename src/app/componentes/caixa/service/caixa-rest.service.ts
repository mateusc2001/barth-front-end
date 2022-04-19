import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedObjectModel } from 'src/app/model/paginated-object.model';
import { environment } from 'src/environments/environment';
import { PageOptionsModel } from '../../extratos-pre-aprovados/model/page-options.model';
import { NovoRegistroCaixa } from '../model/novo-registro-caixa.model';
import { RegistroCaixaModel } from '../model/registro-caixa.model';

@Injectable({
  providedIn: 'root'
})
export class CaixaRestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public buscarRegistrosCaixa(pageOptionsModel: PageOptionsModel): Observable<PaginatedObjectModel<RegistroCaixaModel>> {
    return this.httpClient.get<PaginatedObjectModel<RegistroCaixaModel>>(`${environment.financeiro_service_url}/caixa/page/${pageOptionsModel.pageIndex}/count/${pageOptionsModel.pageSize}`);
  }

  public addRegistro(novoRegistroCaixa: NovoRegistroCaixa): Observable<RegistroCaixaModel> {
    return this.httpClient.post<RegistroCaixaModel>(`${environment.financeiro_service_url}/caixa`, novoRegistroCaixa);
  }
}
