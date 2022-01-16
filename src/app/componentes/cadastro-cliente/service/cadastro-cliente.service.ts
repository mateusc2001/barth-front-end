import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Observable } from 'rxjs';
import { PageOptionsModel } from '../../extratos-pre-aprovados/model/page-options.model';
import { NovoUsuarioModel } from '../../modais/modal-cadastro-cliente/model/novo-usuario.model';
import { NovoUsuarioRequest } from '../mode/novo-usuario.request';
import { CadastroClienteRestService } from './cadastro-cliente-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  constructor(private cadastroClienteRestService: CadastroClienteRestService) { }

  public cadastrarCliente(novoUsuario: NovoUsuarioModel): Observable<any> {
    return this.cadastroClienteRestService.cadastrarUsuario(
      Builder<NovoUsuarioRequest>()
        .nomeCompleto(novoUsuario.nomeCompleto)
        .usuario(novoUsuario.usuario)
        .senha(novoUsuario.senha)
        .base64image(novoUsuario.base64image)
        .build()
    );
  }

  public editarUsuario(novoUsuario: NovoUsuarioModel, userId: number): Observable<any> {
    const request = Builder<NovoUsuarioRequest>()
      .nomeCompleto(novoUsuario.nomeCompleto)
      .usuario(novoUsuario.usuario)
      .base64image(novoUsuario.base64image)
      .build();
    return this.cadastroClienteRestService.editarUsuario(request, userId);
  }

  public buscarUsuariosCadastrados(pageOptions: PageOptionsModel): Observable<any[]> {
    return this.cadastroClienteRestService.buscarUsuariosCadastrados(pageOptions);
  }
}
