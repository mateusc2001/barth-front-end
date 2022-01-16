import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistroTransacaoModel } from '../../modais/aplicar-registro-extrato/model/registro-transacao.model';
import { RegistroDataModel } from '../model/registro-data.model';
import { RegistroModel } from '../model/registro.model';
import { RegistroDataResponse } from '../model/response/registro-data.response';
import { RegistroResponse } from '../model/response/registro.response';
import { PlanosRestService } from './planos-rest.service';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {

  constructor(private planosRestService: PlanosRestService) { }

  public buscarPlanos(pageOptions: any): Observable<RegistroModel> {
    return this.planosRestService.buscarPlanos(pageOptions).pipe(map(item => this.buildRegistroModel(item)));
  }

  public registrarTransacao(registroTransacaoModel: RegistroTransacaoModel): Observable<any> {
    return this.planosRestService.registrarTransacao(registroTransacaoModel);
  }

  public buildRegistroModel(registroResponse: RegistroResponse): RegistroModel {
    return Builder<RegistroModel>()
      .totalPages(registroResponse.totalPages)
      .totalResults(registroResponse.totalResults)
      .data(registroResponse.data.map(item => this.buildRegistroDataModel(item)))
      .build();
  }

  public buildRegistroDataModel(registroResponse: RegistroDataResponse): RegistroDataModel {
    return Builder<RegistroDataModel>()
      .data(registroResponse.data)
      .id(registroResponse.id)
      .descricao(registroResponse.descricao)
      .documento(registroResponse.documento)
      .entrada(registroResponse.entrada)
      .valor(registroResponse.valor)
      .banco(registroResponse.banco)
      .build();
  }
}
