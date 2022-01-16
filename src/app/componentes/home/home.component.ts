import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { skipWhile } from 'rxjs/operators';
import { ModalRegistrosEntreClientesComponent } from './modais/modal-registros-entre-clientes/modal-registros-entre-clientes.component';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuarioLogado: any;
  public colors: any[] = ['#4f398d', '#fd7c1c', '#27d6c9', '#78d000', '#fee51d', '#ebe7f8'];
  public metricas: any;
  public registros: any = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumnsComissoes: string[] = ['position', 'name', 'weight', 'valor-comissao', 'symbol', 'actions'];

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    const user = window.localStorage.getItem('ls.user');
    if (!!user) {
      this.usuarioLogado = JSON.parse(user);
      this.httpClient.get(`http://localhost:1900/user/${this.usuarioLogado.id}`)
        .subscribe(res => {
          this.usuarioLogado = res;
          window.localStorage.setItem('ls.user', JSON.stringify(res));
        });
      this.httpClient.get(`http://localhost:1900/barth/metricas/${this.usuarioLogado.id}`)
        .subscribe(res => {
          this.metricas = res;
        });

      this.httpClient.get(`http://localhost:1900/registros`)
        .subscribe(res => {
          this.registros = res;
        });
    }
  }



  openModalRegistrosEntreClientesComponent(idUsuario: number): void {
    const idUsuarioLogado = this.homeService.getUsuarioLogado();
    const dialogRef = this.dialog.open(ModalRegistrosEntreClientesComponent, {
      width: '950px',
      data: [idUsuario, idUsuarioLogado]
    });

    dialogRef.afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe((result: any) => console.log(result));
  }

  public getColor(index: number): any {
    return this.colors[index];
  }

  public getLargura(porcentagem: string): any {
    return porcentagem.concat('%');
  }

  public getAllRegistros(): any {
    return this.registros;
  }

  public getRegistrosComissionados(): any {
    return this.registros.filter((item: any) => !!item.transacao && item.transacao.geraComissao);
  }

  public getStatusComissao(registro: any): string {
    return registro.transacao.finalizado ? 'Finalizado' : 'Pendente';
  }

}
