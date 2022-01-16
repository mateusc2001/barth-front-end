import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { PageOptionsMapper } from 'src/app/componentes/extratos-pre-aprovados/mapper/page-options.mapper';

@Component({
  selector: 'app-tabela-contas-fixas',
  templateUrl: './tabela-contas-fixas.component.html',
  styleUrls: ['./tabela-contas-fixas.component.css']
})
export class TabelaContasFixasComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'dataCriacao', 'descricao', 'valor'];

  public dataSource = new MatTableDataSource([]);

  @Input() contas: any[] = [];
  @Input() pageOptions: any = PageOptionsMapper.pageOptionsBuilder({
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 5,
    length: 0
  });;

  @Output()
  public updatePageOptionsContasFixas: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.contas) {
      this.dataSource.data = changes.contas.currentValue;
    }

    if (!!changes.pageOptions) {
      this.pageOptions = changes.pageOptions.currentValue;
    }
  }

  ngOnInit(): void {
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public validarStringVazia(text: string): boolean {
    return !text || (!!text && text.trim().length === 0);
  }

  public getDocumento(documento: string): string {
    return this.validarStringVazia(documento) ? 'Não informado' : documento;
  }

  public valorNegativo(valor: number): boolean {
    return valor < 0;
  }

  public valorPositivo(valor: number): boolean {
    return valor > 0;
  }

  public test(event: any): void {
    this.updatePageOptionsContasFixas.emit(event);
  }

  public getDayDate(date: string): number {
    return (new Date(date)).getDay();
  }
}
