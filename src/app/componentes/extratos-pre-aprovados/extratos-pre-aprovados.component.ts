import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Builder } from 'builder-pattern';
import { ModalAplicarRegistroExtratoComponent } from '../modais/aplicar-registro-extrato/modal-aplicar-registro-extrato.component';
import { RegistroTransacaoModel } from '../modais/aplicar-registro-extrato/model/registro-transacao.model';
import { BancoEnum } from '../upload-file/upload-file/enum/banco.enum';
import { PageOptionsMapper } from './mapper/page-options.mapper';
import { PageOptionsModel } from './model/page-options.model';
import { RegistroDataModel } from './model/registro-data.model';
import { PlanosService } from './services/planos.service';
import { skipWhile } from "rxjs/operators";

@Component({
  selector: 'app-extratos-pre-aprovados',
  templateUrl: './extratos-pre-aprovados.component.html',
  styleUrls: ['./extratos-pre-aprovados.component.css']
})
export class ExtratosPreAprovadosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'data', 'descricao', 'documento', 'valor', 'banco', 'acoes'];
  dataSource = new MatTableDataSource<RegistroDataModel>([]);
  pageOptions: any;


  openDialog(registro: any): void {
    const dialogRef = this.dialog.open(ModalAplicarRegistroExtratoComponent, {
      width: '550px',
      data: registro
    });

    dialogRef.afterClosed()
      .pipe(skipWhile((res) => !res))
      .subscribe((result: RegistroTransacaoModel) => this.registrarTransacao(result));
  }


  constructor(private planosService: PlanosService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 5,
      length: 0
    });

    this.atualizarPlanos();
  }

  public registrarTransacao(registroTransacaoModel: RegistroTransacaoModel): void {
    this.planosService.registrarTransacao(registroTransacaoModel)
      .subscribe(res => this.atualizarPlanos());
  }

  public atualizarPlanos(): void {
    this.planosService.buscarPlanos(this.pageOptions)
      .subscribe(res => {
        // console.log(res);
        this.dataSource.data = res.data;
        this.pageOptions.length = res.totalResults;
      });
  }

  test(event: any): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder(event);
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
    return !text || (!!text && text.trim().length == 0);
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }
}
