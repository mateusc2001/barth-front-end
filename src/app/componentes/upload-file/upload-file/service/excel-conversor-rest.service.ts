import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroIntegrationResponse } from '../model/registro.response';
import { RegistroRequest } from '../model/salvar-registro.request';

@Injectable({
  providedIn: 'root'
})
export class ExcelConversorRestService {

  constructor(private httpClient: HttpClient) { }

  public converterExcelSantander(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>(`${environment.converter_service_url}/santander/base`, { base64: base64 });
  }
  public converterExcelSicredi(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>(`${environment.converter_service_url}/sicredi/base`, { base64: base64 });
  }
  public converterExcelOutroBanco(base64: string): Observable<RegistroIntegrationResponse[]> {
    return this.httpClient.post<RegistroIntegrationResponse[]>(`${environment.converter_service_url}/outro-banco/base`, { base64: base64 });
  }

  public salvarRegistros(registroRequest: RegistroRequest[]): Observable<any[]> {
    return this.httpClient.post<any[]>(`${environment.financeiro_service_url}/registro`, registroRequest);
  }
}
