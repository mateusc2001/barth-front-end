import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Builder } from 'builder-pattern';
import { LoginService } from './service/login.service';
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagemErro = 'Erro ao logar';
  exibirMensagemErro = false;

  showLoading = false;

  @Output('usuarioLogado') public usuarioLogado: EventEmitter<any> = new EventEmitter<any>();

  public hide = true;
  public formGroupLogin: FormGroup = this.formBuilder.group({
    txtUsuario: new FormControl('renata'),
    txtSenha: new FormControl('111')
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {

  }

  public verificarLogin() {
    this.showLoading = true;
    const usuario = this.formGroupLogin.controls.txtUsuario.value;
    const senha = this.formGroupLogin.controls.txtSenha.value;
    this.loginService.logar(usuario, senha)
      .pipe(tap(res => this.usuarioLogado.emit(res)))
      .pipe(tap(res => window.localStorage.setItem('ls.user', JSON.stringify(res))))
      .pipe(switchMap(() => this.loginService.getContasComVencimentoHoje()))
      .subscribe(res => {
        window.localStorage.setItem('ls.contasVencimento', JSON.stringify(res));
        this.router.navigate(['/home']);
      }, err => {
        this.showLoading = false;
        this.exibirMensagemErro = true;
        this.mensagemErro = err.error.error;

      });
  }

}

class UserModel {
  constructor(
    public usuario: string,
    public senha: string
  ) { }
}
