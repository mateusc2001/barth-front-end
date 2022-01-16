import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroIntegrationResponse } from '../model/registro.response';
import { RegistroRequest } from '../model/salvar-registro.request';

@Injectable({
  providedIn: 'root'
})
export class ExcelConversorRestService {

  constructor(private httpClient: HttpClient) { }

  public converterExcelSantander(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>('http://localhost:8080/santander/base', { base64: base64 });
  }
  public converterExcelSicredi(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>('http://localhost:8080/sicredi/base', { base64: base64 });
  }
  public converterExcelOutroBanco(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>('http://localhost:8080/outro-banco/base', { base64: base64 });
  }

  public salvarRegistros(registroRequest: RegistroRequest[]): Observable<any[]> {
    return this.httpClient.post<any[]>('http://localhost:1900/registros', registroRequest);
  }
}
