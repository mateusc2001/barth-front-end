import { Component, EventEmitter, OnInit } from '@angular/core';
import { RegistroDataModel } from '../extratos-pre-aprovados/model/registro-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAplicarRegistroExtratoComponent } from '../modais/aplicar-registro-extrato/modal-aplicar-registro-extrato.component';
import { RegistroTransacaoModel } from '../modais/aplicar-registro-extrato/model/registro-transacao.model';
import { PlanosService } from '../extratos-pre-aprovados/services/planos.service';
import { MatDialog } from '@angular/material/dialog';
import { PageOptionsMapper } from '../extratos-pre-aprovados/mapper/page-options.mapper';
import { BancoEnum } from '../upload-file/upload-file/enum/banco.enum';
import { ContasPagarRestService } from './service/contas-pagar-rest.service';
import { ModalNovaContaPagarComponent } from './modais/modal-nova-conta-pagar/modal-nova-conta-pagar.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { skipWhile, switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-contas-pagar',
  templateUrl: './contas-pagar.component.html',
  styleUrls: ['./contas-pagar.component.css']
})
export class ContasPagarComponent implements OnInit {
  // public formGroupCadastroCliente: FormGroup;

  displayedColumns: string[] = ['id', 'dataCriacao', 'descricao', 'valor', 'status', 'acoes'];
  dataSource = new MatTableDataSource<RegistroDataModel>([]);

  public pageOptionsContasVariaveis: any;
  public pageOptionsContasFixas: any;

  public contasFixas = [];
  // public contasVariaveis = [];

  openDialogNovaConta(registro: any): void {
    const dialogRef = this.dialog.open(ModalNovaContaPagarComponent, {
      width: '450px',
      data: registro
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe((result: any) => this.registrarTransacao(result));
  }

  openDialogConfirmarFinalizacao(id: any): void {
    this.contasPagarRestService.finalizar(id)
      .subscribe(res => this.atualizarPlanos());
  }

  public applyFiltera(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private contasPagarRestService: ContasPagarRestService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.pageOptionsContasVariaveis = this.newPagination();
    this.pageOptionsContasFixas = this.newPagination();

    this.atualizarPlanos();
  }

  public registrarTransacao(novaContaPagar: any): void {
    this.contasPagarRestService.novaContaPagar(novaContaPagar)
      .subscribe(() => this.atualizarPlanos());
  }

  public atualizarPlanos(): void {
    this.contasPagarRestService.getContasPagarFixas(this.pageOptionsContasFixas)
      .pipe(tap(res => {
        this.contasFixas = res.data;
        this.pageOptionsContasFixas.length = res.totalResults;
      }))
      .pipe(switchMap(() => this.contasPagarRestService.getContasPagarVariaveis(this.pageOptionsContasVariaveis)))
      .subscribe(res => {
        this.dataSource.data = res.data;
        this.pageOptionsContasVariaveis.length = res.totalResults;
      });
  }

  test(event: any): void {
    this.pageOptionsContasVariaveis = PageOptionsMapper.pageOptionsBuilder(event);
    this.atualizarPlanos();
  }

  updatePageOptionsContasFixas(event: any): void {
    this.pageOptionsContasFixas = PageOptionsMapper.pageOptionsBuilder(event);
    this.atualizarPlanos();
  }

  public getBancoEnum(banco: BancoEnum): string {
    switch (banco) {
      case BancoEnum.SANTANDER:
        return 'Santander';
      case BancoEnum.SICRED:
        return 'Sicred';
      case BancoEnum.OUTRO_BANCO:
        return 'Outro banco';
    }
  }

  public getDocumento(documento: string): string {
    return this.validarStringVazia(documento) ? 'Não informado' : documento;
  }

  public validarStringVazia(text: string): boolean {
    return !text || (!!text && text.trim().length === 0);
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }

  public getContasFixas(): any[] {
    return this.contasFixas;
  }

  public getContasVariaveis(): any {
    return this.dataSource;
  }

  public newPagination(): any {
    return PageOptionsMapper.pageOptionsBuilder({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 5,
      length: 0
    });
  }
}
