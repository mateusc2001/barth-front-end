import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedObjectModel } from 'src/app/model/paginated-object.model';
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
    return this.httpClient.get<PaginatedObjectModel<RegistroCaixaModel>>(`http://localhost:1900/registro/caixa/page/${pageOptionsModel.pageIndex}/count/${pageOptionsModel.pageSize}`);
  }

  public addRegistro(novoRegistroCaixa: NovoRegistroCaixa): Observable<RegistroCaixaModel> {
    return this.httpClient.post<RegistroCaixaModel>(`http://localhost:1900/add/registro/caixa`, novoRegistroCaixa);
  }
}
