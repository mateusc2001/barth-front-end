import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadFileComponent } from './componentes/upload-file/upload-file/upload-file.component';
import { ExcelConversorRestService } from './componentes/upload-file/upload-file/service/excel-conversor-rest.service';
import { ExcelConversorService } from './componentes/upload-file/upload-file/service/excel-conversor.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from './componentes/login/login/service/login.service';
import { LoginRestService } from './componentes/login/login/service/login-rest.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { ExtratosPreAprovadosComponent } from './componentes/extratos-pre-aprovados/extratos-pre-aprovados.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAplicarRegistroExtratoComponent } from './componentes/modais/aplicar-registro-extrato/modal-aplicar-registro-extrato.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CadastroClienteComponent } from './componentes/cadastro-cliente/cadastro-cliente.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalCadastroClienteComponent } from './componentes/modais/modal-cadastro-cliente/modal-cadastro-cliente.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContasPagarComponent } from './componentes/contas-pagar/contas-pagar.component';
import { ContasReceberComponent } from './componentes/contas-receber/contas-receber.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ModalNovaContaPagarComponent } from './componentes/contas-pagar/modais/modal-nova-conta-pagar/modal-nova-conta-pagar.component';
import { ModalNovaContaReceberComponent } from './componentes/contas-pagar/modais/modal-nova-conta-receber/modal-nova-conta-receber.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TabelaContasFixasComponent } from './componentes/contas-pagar/componentes/tabela-contas-fixas/tabela-contas-fixas.component';
import { NgxCurrencyModule } from "ngx-currency";
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EdicaoUsuarioComponent } from './componentes/cadastro-cliente/modais/edicao-usuario/edicao-usuario.component';
import { CaixaComponent } from './componentes/caixa/caixa.component';
import { ModalNovoRegistroCaixaComponent } from './componentes/caixa/modais/modal-novo-registro-caixa/modal-novo-registro-caixa.component';
import { MatRadioModule } from '@angular/material/radio';
import { ModalRegistrosEntreClientesComponent } from './componentes/home/modais/modal-registros-entre-clientes/modal-registros-entre-clientes.component';
import { DespesasAutomovelComponent } from './componentes/despesas-automovel/despesas-automovel.component';
import { ModalCadastroDespesaVeiculoComponent } from './componentes/despesas-automovel/modais/modal-cadastro-despesa-veiculo/modal-cadastro-despesa-veiculo.component';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadFileComponent,
    ExtratosPreAprovadosComponent,
    ModalAplicarRegistroExtratoComponent,
    CadastroClienteComponent,
    ModalCadastroClienteComponent,
    ContasPagarComponent,
    ContasReceberComponent,
    ModalNovaContaPagarComponent,
    ModalNovaContaReceberComponent,
    TabelaContasFixasComponent,
    EdicaoUsuarioComponent,
    CaixaComponent,
    ModalNovoRegistroCaixaComponent,
    ModalRegistrosEntreClientesComponent,
    DespesasAutomovelComponent,
    ModalCadastroDespesaVeiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFileUploadModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(maskConfig),
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule,
    MatBadgeModule,
    MatDatepickerModule,
    NgxCurrencyModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [
    ExcelConversorRestService,
    ExcelConversorService,
    LoginService,
    LoginRestService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
