import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { skipWhile } from 'rxjs/operators';
import { PageOptionsMapper } from '../extratos-pre-aprovados/mapper/page-options.mapper';
import { PageOptionsModel } from '../extratos-pre-aprovados/model/page-options.model';
import { ModalRegistrosEntreClientesComponent } from '../home/modais/modal-registros-entre-clientes/modal-registros-entre-clientes.component';
import { ModalNovoRegistroCaixaComponent } from './modais/modal-novo-registro-caixa/modal-novo-registro-caixa.component';
import { NovoRegistroCaixa } from './model/novo-registro-caixa.model';
import { RegistroCaixaModel } from './model/registro-caixa.model';
import { CaixaService } from './service/caixa.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  constructor(private caixaService: CaixaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buscarRegistrosCaixa();
  }

  public registrosCaixa: any;
  public pageOptions: PageOptionsModel = this.newPagination;

  displayedColumns: string[] = ['id', 'dataCriacao', 'descricao', 'valor', 'saldoFinal'];
  public dataSource: RegistroCaixaModel[] = [];

  public buscarRegistrosCaixa(): void {
    this.caixaService.buscarRegistrosCaixa(this.pageOptions)
      .subscribe(res => {
        this.dataSource = res.data;
        this.pageOptions.length = res.totalResults;
      });
  }

  openDialogNovaConta(): void {
    const dialogRef = this.dialog.open(ModalNovoRegistroCaixaComponent, {
      width: '450px'
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe((result: NovoRegistroCaixa) => this.salvarRegistro(result));
  }

  public salvarRegistro(resgistro: any): void {
    if (resgistro != null) this.caixaService.addRegistro(resgistro)
      .subscribe(res => this.buscarRegistrosCaixa());
  }

  updatePageOptions(event: any): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder(event);
    this.buscarRegistrosCaixa();
  }

  public getDocumento(documento: string): string {
    return this.validarStringVazia(documento) ? 'Não informado' : documento;
  }

  public validarStringVazia(text: string): boolean {
    return !text || (!!text && text.trim().length == 0);
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }

  public get newPagination(): PageOptionsModel {
    return PageOptionsMapper.pageOptionsBuilder({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 5,
      length: 0
    });
  }
}
