import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageOptionsMapper } from 'src/app/componentes/extratos-pre-aprovados/mapper/page-options.mapper';
import { PageOptionsModel } from 'src/app/componentes/extratos-pre-aprovados/model/page-options.model';
import { ModalAplicarRegistroExtratoService } from 'src/app/componentes/modais/aplicar-registro-extrato/service/modal-aplicar-registro-extrato.service';
import { ModalRegistroEntreClientesService } from './service/modal-registro-entre-clientes.service';

@Component({
  selector: 'app-modal-registros-entre-clientes',
  templateUrl: './modal-registros-entre-clientes.component.html',
  styleUrls: ['./modal-registros-entre-clientes.component.css']
})
export class ModalRegistrosEntreClientesComponent implements OnInit {

  constructor(public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ModalRegistroEntreClientesService) {
    this.pageOptions = PageOptionsMapper.newPaginationModel();
  }

  pageOptions: PageOptionsModel;

  displayedColumnsContasVariaveis: string[] = ['id', 'data', 'descricao','documento', 'valor', 'origem', 'destino'];
  dataSource: any[] = [];

  public users: any[] = [];
  // public registros: any[] = [];

  ngOnInit(): void {
    this.buscarRegistros();
  }

  public buscarRegistros(): void {
    this.service.getRegistrosEntreClientes(this.pageOptions, this.data)
      .subscribe(res => {
        this.pageOptions.length = res.totalResults;
        this.users = res.data.usuarios;
        this.dataSource = res.data.registros;
      });
  }

  public getNomeUsuario(idUsuario: number): string {
    const user = this.users[idUsuario];
    return !!user ? user.nomeCompleto : '';
    // return ''
  }

  public getNomeUsuarioPorId(userId: number): string {
    return this.users.find(user => user.id == userId).nomeCompleto.split(" ")[0];
  }

  public getDocumento(documento: string): string {
    return this.validarStringVazia(documento) ? 'Não informado' : documento;
  }

  public validarStringVazia(text: string): boolean {
    return !text || (!!text && text.trim().length == 0);
  }

  public updatepageOptions(event: any): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder(event);
    this.buscarRegistros();
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }
}
