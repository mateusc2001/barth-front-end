import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { skipWhile } from 'rxjs/operators';
import { PageOptionsMapper } from '../extratos-pre-aprovados/mapper/page-options.mapper';
import { ModalCadastroDespesaVeiculoComponent } from './modais/modal-cadastro-despesa-veiculo/modal-cadastro-despesa-veiculo.component';

@Component({
  selector: 'app-despesas-automovel',
  templateUrl: './despesas-automovel.component.html',
  styleUrls: ['./despesas-automovel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DespesasAutomovelComponent implements OnInit {
  dataSource = [];

  public pageOptions = PageOptionsMapper.newPaginationModel();
  displayedColumns = ['id', 'data', 'descricao', 'valor'];
  columnsToDisplay = ['id', 'modelo', 'placa', 'cor', 'totalDespesas', 'acoes'];
  expandedElement: any | null;

  constructor(private dialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.buscarCarros();
  }

  public buscarCarros(): void {
    this.httpClient.get(`http://localhost:1900/carros`)
      .subscribe((res: any) => {
        this.dataSource = res;
      });
  }

  cadastrarDespesa(element: any) {
    const dialogRef = this.dialog.open(ModalCadastroDespesaVeiculoComponent, {
      width: '350px',
      data: element
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe(result => this.salvarDespesa(
        {
          despesa: result,
          idVeiculo: element.id
        }
      ));
  }

  public salvarDespesa(request: any): void {
    this.httpClient.post(`http://localhost:1900/carros/add/despesa`, request)
      .subscribe(res => {
        this.dataSource.forEach((item: any) => {
          if (item.id == request.idVeiculo) {
            item = res;
          }
        });
        this.buscarCarros();
      });
  }

}
