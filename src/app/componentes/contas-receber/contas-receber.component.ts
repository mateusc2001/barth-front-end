import { Component, OnInit } from '@angular/core';
import { RegistroDataModel } from "../extratos-pre-aprovados/model/registro-data.model";
import { MatTableDataSource } from "@angular/material/table";
import { ModalAplicarRegistroExtratoComponent } from "../modais/aplicar-registro-extrato/modal-aplicar-registro-extrato.component";
import { RegistroTransacaoModel } from "../modais/aplicar-registro-extrato/model/registro-transacao.model";
import { PlanosService } from "../extratos-pre-aprovados/services/planos.service";
import { MatDialog } from "@angular/material/dialog";
import { PageOptionsMapper } from "../extratos-pre-aprovados/mapper/page-options.mapper";
import { BancoEnum } from "../upload-file/upload-file/enum/banco.enum";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalNovaContaReceberComponent } from '../contas-pagar/modais/modal-nova-conta-receber/modal-nova-conta-receber.component';
import { ContasReceberRestService } from './services/contas-receber-rest.service';
import { skip, skipWhile, switchMap, tap } from 'rxjs/operators';
import { DetalheContaFixaComponent } from '../modais/detalhe-conta-fixa/detalhe-conta-fixa.component';

@Component({
  selector: 'app-contas-receber',
  templateUrl: './contas-receber.component.html',
  styleUrls: ['./contas-receber.component.css']
})
export class ContasReceberComponent implements OnInit {

  displayedColumnsContasVariaveis: string[] = ['id', 'dataCriacao', 'descricao', 'valor', 'status', 'acoes'];
  displayedColumnsContasFixas: string[] = ['id', 'dataCriacao', 'descricao', 'valor', 'acoes'];

  dataSourceContasVariaveis = new MatTableDataSource<RegistroDataModel>([]);
  dataSourceContasFixas = new MatTableDataSource<RegistroDataModel>([]);

  pageOptionsContasFixas: any;
  pageOptionsContasVariaveis: any;

  public loadingVariaveis: boolean = false;
  public loadingFixas: boolean = false;

  public atualizarLoadingVariaveis(status: boolean) {
    this.loadingVariaveis = status;
  }

  public atualizarLoadingFixas(status: boolean) {
    this.loadingFixas = status;
  }

  openDialogNovaConta(): void {
    const dialogRef = this.dialog.open(ModalNovaContaReceberComponent, {
      width: '450px'
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe((result: any) => this.registrarTransacao(result));
  }

  openDialogDetalhamentoConta(item: any): void {
    const dialogRef = this.dialog.open(DetalheContaFixaComponent, {
      width: '650px',
      data: item
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe((result: any) => this.registrarTransacao(result));
  }

  applyFilter(list: MatTableDataSource<RegistroDataModel>, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    list.filter = filterValue.trim().toLowerCase();
  }

  openDialogConfirmarFinalizacao(id: any): void {
    this.contasReceberRestService.finalizar(id)
      .subscribe(res => this.atualizarPlanos())
  }


  constructor(private contasReceberRestService: ContasReceberRestService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pageOptionsContasFixas = this.newPageOptions();
    this.pageOptionsContasVariaveis = this.newPageOptions();

    this.atualizarPlanos();
  }

  public registrarTransacao(novaContaPagar: any): void {
    this.contasReceberRestService.novaContaPagar(novaContaPagar)
      .subscribe(res => this.atualizarPlanos());
  }

  public atualizarPlanos(): void {
    this.atualizarLoadingFixas(true);
    this.atualizarLoadingVariaveis(true);
    this.contasReceberRestService.getContasReceberVariaveis(this.pageOptionsContasVariaveis)
      .pipe(tap(res => {
        this.atualizarLoadingVariaveis(false);
        this.dataSourceContasVariaveis.data = res.data;
        this.pageOptionsContasVariaveis.length = res.totalResults;
      }))
      .pipe(switchMap(() => this.contasReceberRestService.getContasReceberFixas(this.pageOptionsContasFixas)))
      .subscribe(res => {
        this.atualizarLoadingFixas(false);
        this.dataSourceContasFixas.data = res.data;
        this.pageOptionsContasFixas.length = res.totalResults;
      });
  }

  updatePageOptionsContasFixas(event: any): void {
    this.pageOptionsContasFixas = PageOptionsMapper.pageOptionsBuilder(event);
    this.atualizarPlanos();
  }

  updatePageOptionsContasVariaveis(event: any): void {
    this.pageOptionsContasVariaveis = PageOptionsMapper.pageOptionsBuilder(event);
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
    return this.dataSourceContasFixas.data;
  }

  public getContasVariaveis(): any[] {
    return this.dataSourceContasVariaveis.data;
  }

  public newPageOptions(): any {
    return PageOptionsMapper.newPaginationModel();
  }
}
