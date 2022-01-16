import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageOptionsModel } from 'src/app/componentes/extratos-pre-aprovados/model/page-options.model';

@Injectable({
  providedIn: 'root'
})
export class ModalRegistroEntreClientesService {

  constructor(private httpClient: HttpClient) { }

  public getRegistrosEntreClientes(pageOptions: PageOptionsModel, userIds: number[]): Observable<any> {
    return this.httpClient.get(`http://localhost:1900/registros/por-usuarios/page/${pageOptions.pageIndex}/count/${pageOptions.pageSize}?users=${userIds[0]}&users=${userIds[1]}`);
  }
}
