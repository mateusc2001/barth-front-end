import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from './componentes/cadastro-cliente/cadastro-cliente.component';
import { ExtratosPreAprovadosComponent } from './componentes/extratos-pre-aprovados/extratos-pre-aprovados.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login/login.component';
import { UploadFileComponent } from './componentes/upload-file/upload-file/upload-file.component';
import {ContasPagarComponent} from "./componentes/contas-pagar/contas-pagar.component";
import {ContasReceberComponent} from "./componentes/contas-receber/contas-receber.component";
import { CaixaComponent } from './componentes/caixa/caixa.component';
import { DespesasAutomovelComponent } from './componentes/despesas-automovel/despesas-automovel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'upload-file',
    component: UploadFileComponent
  },
  {
    path: 'extratos-pre-aprovados',
    component: ExtratosPreAprovadosComponent
  },
  {
    path: 'cadastro-cliente',
    component: CadastroClienteComponent
  },
  {
    path: 'contas-a-pagar',
    component: ContasPagarComponent
  },
  {
    path: 'contas-a-receber',
    component: ContasReceberComponent
  },
  {
    path: 'caixa',
    component: CaixaComponent
  },
  {
    path: 'despesas-auto',
    component: DespesasAutomovelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
