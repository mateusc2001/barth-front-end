import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRestService } from './login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loginRestService: LoginRestService) { }

  public logar(usuario: string, senha: string): Observable<any> {
    return this.loginRestService.logar({ 'usuario': usuario, 'senha': senha });
  }

  public getContasComVencimentoHoje(): Observable<any> {
    return this.loginRestService.getContasComVencimentoHoje();
  }
}
