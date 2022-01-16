import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageOptionsModel } from '../../extratos-pre-aprovados/model/page-options.model';
import { NovoUsuarioRequest } from '../mode/novo-usuario.request';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteRestService {

  constructor(private httpClient: HttpClient) { }

  public cadastrarUsuario(novoUsuario: NovoUsuarioRequest): Observable<any> {
    return this.httpClient.post<any>('http://localhost:1900/add/user', novoUsuario);
  }

  public editarUsuario(novoUsuario: NovoUsuarioRequest, userId: number): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:1900/user/${userId}`, novoUsuario);
  }

  public buscarUsuariosCadastrados(pageOptions: PageOptionsModel): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:1900/users/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}`);
  }
}
