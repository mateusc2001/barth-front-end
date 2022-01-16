import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageOptionsMapper } from '../extratos-pre-aprovados/mapper/page-options.mapper';
import { PageOptionsModel } from '../extratos-pre-aprovados/model/page-options.model';
import { ModalCadastroClienteComponent } from '../modais/modal-cadastro-cliente/modal-cadastro-cliente.component';
import { NovoUsuarioModel } from '../modais/modal-cadastro-cliente/model/novo-usuario.model';
import { CadastroClienteService } from './service/cadastro-cliente.service';
import {skipWhile} from 'rxjs/operators';
import {EdicaoUsuarioComponent} from "./modais/edicao-usuario/edicao-usuario.component";

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dataCriacao', 'nome', 'usuario', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  public pageOptions: PageOptionsModel = new PageOptionsModel(0, 0, 5, 0);

  constructor(private dialog: MatDialog, private cadastroClienteService: CadastroClienteService) { }

  ngOnInit(): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder({
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 5,
      length: this.dataSource.data.length
    });
    this.buscarUsuarios();
  }

  public buscarUsuarios(): void {
    this.cadastroClienteService.buscarUsuariosCadastrados(this.pageOptions)
      .subscribe((res: any) => {
        this.dataSource.data = res.data;
        this.pageOptions.length = res.totalResults;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCadastroClienteComponent, {
      width: '350px'
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe(result => this.cadastrarCliente(result));
  }

  openDialogEdicaoCliente(element: any): void {
    const dialogRef = this.dialog.open(EdicaoUsuarioComponent, {
      width: '350px',
      data: element
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe(result => {
        console.log(result);
        this.editarCliente(result);
      });
  }

  public cadastrarCliente(novoUsuario: NovoUsuarioModel): void {
    this.cadastroClienteService.cadastrarCliente(novoUsuario)
      .subscribe(res => this.buscarUsuarios());
  }

  public editarCliente(novoUsuario: any): void {
    this.cadastroClienteService.editarUsuario(novoUsuario, novoUsuario.id)
      .subscribe(res => this.buscarUsuarios());
  }

  atualizarPaginas(event: any): void {
    this.pageOptions = PageOptionsMapper.pageOptionsBuilder(event);
    this.buscarUsuarios();
  }
}
