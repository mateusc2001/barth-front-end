import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BancoEnum } from '../enum/banco.enum';
import { ExcelConversorRestService } from './excel-conversor-rest.service';
import { RegistroModel } from '../model/registro.model';
import { Builder } from 'builder-pattern';
import { RegistroRequest } from '../model/salvar-registro.request';
import { RegistroIntegrationResponse } from '../model/registro.response';

@Injectable({
  providedIn: 'root'
})
export class ExcelConversorService {

  constructor(private excelConversorRestService: ExcelConversorRestService) { }

  public converterExcelSantander(base64: string, banco: number): Observable<RegistroIntegrationResponse[]> {
    switch (banco) {
      case BancoEnum.SICRED:
        return this.excelConversorRestService.converterExcelSicredi(base64.split(',')[1]);
      case BancoEnum.SANTANDER:
        return this.excelConversorRestService.converterExcelSantander(base64.split(',')[1]);
      case BancoEnum.OUTRO_BANCO:
        return this.excelConversorRestService.converterExcelOutroBanco(base64.split(',')[1]);
      default:
        return Observable.throw('Opçao inválida.');
    }
  }

  public salvarRegistros(registroModelList: RegistroModel[]): Observable<any[]> {
    return this.excelConversorRestService.salvarRegistros(registroModelList.map(item => Builder<RegistroRequest>()
      .banco(item.banco)
      .data(item.data)
      .descricao(item.descricao)
      .documento(item.documento)
      .entrada(item.entrada)
      .valor(item.valor)
      .build()
    ));
  }
}
