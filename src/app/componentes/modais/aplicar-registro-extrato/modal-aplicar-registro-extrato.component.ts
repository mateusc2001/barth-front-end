import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Builder } from 'builder-pattern';
import { BrowserStack } from 'protractor/built/driverProviders';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegistroTransacaoModel } from './model/registro-transacao.model';
import { TransacaoDeRegistroModel } from './model/transacao-de-registro.model';
import { ModalAplicarRegistroExtratoService } from './service/modal-aplicar-registro-extrato.service';

@Component({
  selector: 'app-modal-aplicar-registro-extrato',
  templateUrl: './modal-aplicar-registro-extrato.component.html',
  styleUrls: ['./modal-aplicar-registro-extrato.component.css']
})
export class ModalAplicarRegistroExtratoComponent implements OnInit {

  public destinos: any[] = [];
  public pagarComissao: any;

  public seasons: any[] = [
    {
      text: 'Conta a pagar',
      value: 1
    },
    {
      text: 'Conta a receber',
      value: 2
    },
    {
      text: 'Comissão',
      value: 6
    },
    {
      text: 'Multiplas transferencias',
      value: 5
    }
  ];

  // {
  //   text: 'Despesa de carro',
  //   value: 3
  // }

  public contas: any = [];
  public carros: any = [];

  public formGroupTipoRegistro: FormGroup;
  public formGroupContaSelecionada: FormGroup;
  public formGroupCarroSelecionado: FormGroup;
  public multiplasTransferencias: FormGroup;
  public novaMultiplaTransferenciaForm: FormGroup;

  checked = false;

  public registros: any = [];

  constructor(
    public dialogRef: MatDialogRef<ModalAplicarRegistroExtratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalAplicarRegistroExtratoService: ModalAplicarRegistroExtratoService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder) {

    this.formGroupTipoRegistro = this.formBuilder.group({
      tipoRegistro: this.formBuilder.control(null, Validators.required)
    });

    this.formGroupContaSelecionada = this.formBuilder.group({
      contaSelecionada: this.formBuilder.control(null, Validators.required)
    });

    this.formGroupCarroSelecionado = this.formBuilder.group({
      carroSelecionado: this.formBuilder.control(null, Validators.required),
      descricao: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control(this.data.valor)
    });

    this.multiplasTransferencias = this.formBuilder.group({
      usuarioOrigem: this.formBuilder.control(null, Validators.required),
      transferencias: this.formBuilder.array([])
    });

    this.novaMultiplaTransferenciaForm = this.formBuilder.group({
      usuarioDestino: this.formBuilder.control(null, Validators.required),
      descricao: this.formBuilder.control(''),
      valor: this.formBuilder.control(0, [Validators.required, Validators.min(1)])
    });
  }

  public validarTotalTransacoes() {
    const response = this.multiplasTransferencias.controls.transferencias.value
      .reduce((acc: any, cur: any) => acc =+ cur.valor, 0);
      console.log(response)
      return response > this.data.valor;
  }

  get transferencias(): FormArray {
    const response = this.multiplasTransferencias.get('transferencias') as FormArray;
    return response;
  }

  public getUsuarioPorId(idUsuario: number) {
    return this.destinos.find(item => item.id == idUsuario);
  }

  saldoRestante() {
    return Math.abs(this.data.valor) - this.multiplasTransferencias.controls.transferencias.value
      .reduce((acc: any, cur: any) => acc += cur.controls.valor.value, 0);
  }

  adicionarTransferencia() {
    const controlsNovaTransferencia = this.novaMultiplaTransferenciaForm.controls
    this.multiplasTransferencias.controls.transferencias.value.push(
      this.formBuilder.group({
        usuarioDestino: controlsNovaTransferencia.usuarioDestino.value,
        descricao: controlsNovaTransferencia.descricao.value,
        valor: controlsNovaTransferencia.valor.value
      })
    );
    this.novaMultiplaTransferenciaForm.reset();
  }

  logarCoisas() {
    console.log(this.multiplasTransferencias.controls.transferencias.value);
  }

  ngOnInit(): void {
    this.modalAplicarRegistroExtratoService.buscarUsuarios()
      .subscribe(res => this.destinos = res);
    this.httpClient.get(`${environment.financeiro_service_url}/registro`)
      .subscribe(res => {
        this.registros = res;
      });

  }

  doSomething(event: any) {
    this.formGroupContaSelecionada.controls.contaSelecionada.setValue(null);
    switch (event.value) {
      case 1:
        this.buscarContasPagar();
        break;
      case 2:
        this.buscarContasReceber();
        break;
      case 3:
        this.buscarCarros();
        break;
    }
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }

  public buscarContasPagar(): void {
    this.httpClient.get(`${environment.financeiro_service_url}/conta/ativas?contaPagar=true&contaFixa=false`)
      .subscribe(res => this.contas = res);
  }

  public buscarContasReceber(): void {
    this.httpClient.get(`${environment.financeiro_service_url}/conta/ativas?contaPagar=false&contaFixa=false`)
      .subscribe(res => this.contas = res);
  }

  public buscarCarros(): void {
    this.httpClient.get(`http://localhost:1900/carros`)
      .subscribe(res => this.carros = res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public filterRegistrosComissionados() {
    return this.registros
      .filter((item: any) =>
        !!item.transacoes
        && !!item.transacoes.comissao
        && !item.transacoes.comissao.finalizado);
  }

  public getRegistrosComisionados(): any {
    return this.filterRegistrosComissionados()
      .map((item: any) => {
        if (!!item.descricao && item.descricao.length > 0) {
          return item.id + ' | ' + item.descricao;
        } else {
          return item.id + ' | ' + item.documento;
        }
      });
  }

  public getRegistrosComisionadosItem(): any {
    return this.registros.filter((item: any) => !!item.transacao && item.transacao.geraComissao);
  }

  emitOnClose(): any {
    if (this.formGroupTipoRegistro.controls.tipoRegistro.value == 4) {
      return this.buildEmitTransferencia();
    } else {
      return null;
    }
  }

  public executar() {
    switch (this.formGroupTipoRegistro.controls.tipoRegistro.value) {
      case 1:
        this.finalizarContaPagar(this.formGroupContaSelecionada.controls.contaSelecionada.value);
        break;
      case 2:
        this.finalizarContaReceber(this.formGroupContaSelecionada.controls.contaSelecionada.value);
        break;
      case 3:
        const request = {
          despesa: {
            descricao: this.formGroupCarroSelecionado.controls.descricao.value,
            valor: this.formGroupCarroSelecionado.controls.valor.value
          },
          idVeiculo: this.formGroupCarroSelecionado.controls.carroSelecionado.value
        };
        this.httpClient.post(`http://localhost:1900/carros/add/despesa`, request)
          .subscribe(res => console.log(res));
        break;
      case 5:
        const request2: any = {
          usuarioOrigem: this.multiplasTransferencias.controls.usuarioOrigem.value,
          valorDescontarUsuarioOrigem: this.data.valor * -1,
          usuariosDestino: this.transferencias.value.map((item: any) => {
            return {
              descricao: item.controls.descricao.value,
              idUsuario: item.controls.usuarioDestino.value,
              valor: this.data.valor > 0 ? item.controls.valor.value : item.controls.valor.value * -1
            };
          })
        };

        if (this.data.geraComissao) {
          request2.comissao = {
            porcentagemComissao: this.data.porcentagemComissao,
            valorComissao: this.data.valor * (this.data.porcentagemComissao / 100)
          }
        }
        const idRegistro = this.data.id;
        this.httpClient.patch(`${environment.financeiro_service_url}/registro/${idRegistro}/transacao`, request2)
          .subscribe(() => { });
        break;

      case 6:
        const idReg = this.getIdRegistroComissaoSelecionado();
        this.httpClient.patch(`${environment.financeiro_service_url}/registro/finalizar/comissao/${idReg}`, {})
          .subscribe(() => { });
        break;
    }
  }

  public getIdRegistroComissaoSelecionado() {
    if (this.pagarComissao == null) return;
    return this.filterRegistrosComissionados()[this.pagarComissao].id;
  }

  public setFullValue() {
    this.novaMultiplaTransferenciaForm.controls.valor.setValue(this.data.valor);
  }

  public finalizarContaReceber(idConta: number): void {
    this.httpClient.patch(`${environment.financeiro_service_url}/conta/finalizar/${idConta}`, {})
      .pipe(switchMap(() => this.httpClient.patch(`${environment.financeiro_service_url}/registro/${this.data.id}/transacao`, {})))
      .subscribe(res => { });
  }

  public finalizarContaPagar(idConta: number): void {
    this.httpClient.patch(`${environment.financeiro_service_url}/conta/finalizar/${idConta}`, {})
      .pipe(switchMap(() => this.httpClient.patch(`${environment.financeiro_service_url}/registro/${this.data.id}/transacao`, {})))
      .subscribe(res => { });
  }

  public buildEmitTransferencia(): any {
    const percentual = this.data.porcentagemComissao || '';
    if (!!percentual && percentual.length === 4) {
      const percentualDesconto = ''
        .concat(percentual.split('')[0])
        .concat(percentual.split('')[1])
        .concat('.')
        .concat(percentual.split('')[2])
        .concat(percentual.split('')[3]);
      this.data.porcentagemComissao = parseFloat(percentualDesconto);
      this.data.valorComissao = parseFloat((this.data.valor * (parseFloat(percentualDesconto) / 100)).toFixed(2));
    }
    return Builder<RegistroTransacaoModel>()
      .id(this.data.id)
      .data(this.data.data)
      .descricao(this.data.descricao)
      .documento(this.data.documento)
      .entrada(this.data.entrada)
      .valor(this.data.valor)
      .banco(this.data.banco)
      .descricaoPessoal(this.data.descricaoPessoal)
      .transacao(Builder<TransacaoDeRegistroModel>()
        .idUsuarioOrigem(this.data.origem)
        .idUsuarioDestinatario(this.data.destinatario)
        .geraComissao(!!this.data.geraComissao)
        .porcentagemComissao(this.data.geraComissao ? this.data.porcentagemComissao : null)
        .valorComissao(this.data.geraComissao ? this.data.valorComissao : null)
        .comissaoRegistro(this.getRegistrosComisionadosItem()[this.pagarComissao])
        .build())
      .build();
  }

  public desabilitarBtnSalvar(): any {
    const usuarioOrigem = this.data.origem;
    const usuarioDestinatario = this.data.destinatario;
    const porcentagemComissao = this.data.porcentagemComissao;
    const registroComComissaoInvalido = ((!!porcentagemComissao && porcentagemComissao.toString().length < 4)
      || !porcentagemComissao) && !!this.data.geraComissao;
    return registroComComissaoInvalido
      || !usuarioOrigem
      || !usuarioDestinatario;
  }
}
