import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroTransacaoModel } from '../../modais/aplicar-registro-extrato/model/registro-transacao.model';
import { RegistroDataResponse } from '../model/response/registro-data.response';
import { RegistroResponse } from '../model/response/registro.response';

@Injectable({
  providedIn: 'root'
})
export class PlanosRestService {

  constructor(private httpClient: HttpClient) { }

  public buscarPlanos(pageOptions: any): Observable<RegistroResponse> {
    return this.httpClient.get<RegistroResponse>(`${environment.financeiro_service_url}/registro/transacoes/pendentes/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }

  public registrarTransacao(registro: RegistroTransacaoModel): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:1900/registrar-transacao`, registro);
  }

  public removerTransacao(idRegistro: any) {
    return this.httpClient.delete<any>(`${environment.financeiro_service_url}/registro/${idRegistro}`);
  }
}
