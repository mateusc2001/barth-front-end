import { Component, HostListener, OnInit } from '@angular/core';
import { BancoEnum } from './enum/banco.enum';
import { ExcelConversorService } from './service/excel-conversor.service';
import { RegistroModel } from './model/registro.model';
import { Builder } from 'builder-pattern';
import { RegistroIntegrationResponse } from './model/registro.response';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public files: any[];
  fileBlob = null;
  public foods: any[];
  selectedValue = null;
  public bancoEnum = BancoEnum;

  constructor(private excelConversorService: ExcelConversorService) {
    this.files = []
    this.foods = [
      { value: this.bancoEnum.SICRED, viewValue: 'Sicredi' },
      { value: this.bancoEnum.SANTANDER, viewValue: 'Santander' },
      { value: this.bancoEnum.OUTRO_BANCO, viewValue: 'Outro Banco' },
    ];
  }

  error: string = '';
  dragAreaClass: string = '';
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }
  ngOnInit() {
    this.dragAreaClass = "dragarea";
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }


  saveFiles(files: FileList) {
    this.files = Array.from(files).map(item => item);
  }

  public getDateFromTimesTamp(timestamp: number): Date {
    return new Date(timestamp);
  }

  changeFile(file: any): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public fazerUploadEspecifyFile(file: any, index: any): void {
    file.loading = true;
    this.changeFile(file).then((base64: string) => {
      this.excelConversorService.converterExcelSantander(base64, file.banco)
        .pipe(switchMap(res => this.excelConversorService.salvarRegistros(res.map(item => this.mapper(item, file.banco)))))
        .subscribe(res => {
          file.loading = false;
          this.files.splice(index, 1);
        });
    });
  }

  public removeFileToUpload(index: number): void {
    this.files.splice(index, 1);
  }

  public mapper(registroResponse: RegistroIntegrationResponse, banco: BancoEnum): RegistroModel {
    return Builder<RegistroModel>()
      .documento(registroResponse.documento)
      .banco(banco)
      .data(registroResponse.data)
      .descricao(registroResponse.descricao)
      .entrada(registroResponse.entrada)
      .valor(registroResponse.valor)
      .build();
  }
}
