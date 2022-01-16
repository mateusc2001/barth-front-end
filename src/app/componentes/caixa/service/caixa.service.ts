import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedObjectModel } from 'src/app/model/paginated-object.model';
import { PageOptionsModel } from '../../extratos-pre-aprovados/model/page-options.model';
import { NovoRegistroCaixa } from '../model/novo-registro-caixa.model';
import { RegistroCaixaModel } from '../model/registro-caixa.model';
import { CaixaRestService } from './caixa-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  constructor(private caixaRestService: CaixaRestService) { }

  public buscarRegistrosCaixa(pageOptionsModel: PageOptionsModel): Observable<PaginatedObjectModel<RegistroCaixaModel>> {
    return this.caixaRestService.buscarRegistrosCaixa(pageOptionsModel);
  }

  public addRegistro(novoRegistroCaixa: NovoRegistroCaixa): Observable<RegistroCaixaModel> {
    return this.caixaRestService.addRegistro(novoRegistroCaixa);
  }
}
