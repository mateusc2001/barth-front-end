import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageOptionsModel } from '../../extratos-pre-aprovados/model/page-options.model';
import { NovoUsuarioRequest } from '../mode/novo-usuario.request';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteRestService {

  constructor(private httpClient: HttpClient) { }

  public cadastrarUsuario(novoUsuario: NovoUsuarioRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.financeiro_service_url}/usuario`, novoUsuario);
  }

  public editarUsuario(novoUsuario: NovoUsuarioRequest, userId: number): Observable<any> {
    return this.httpClient.put<any>(`${environment}/usuario/${userId}`, novoUsuario);
  }

  public buscarUsuariosCadastrados(pageOptions: PageOptionsModel): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.financeiro_service_url}/usuario/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }
}
