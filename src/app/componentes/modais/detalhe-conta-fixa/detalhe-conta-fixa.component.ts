import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe-conta-fixa',
  templateUrl: './detalhe-conta-fixa.component.html',
  styleUrls: ['./detalhe-conta-fixa.component.css']
})
export class DetalheContaFixaComponent implements OnInit {

  public registros: any = [];
  public erroMessage: any = null;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DetalheContaFixaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient) { }

  @ViewChild(MatAccordion) accordion: MatAccordion;



  ngOnInit(): void {
    this.alterarStatusLoading(true);
    this.httpClient.get(`${environment.financeiro_service_url}/registro/conta/${this.data.id}`)
      .subscribe(
        (res: any) => {
          this.alterarStatusLoading(false)
          this.registros = res
        },
        err => {
          this.alterarStatusLoading(false)
          this.erroMessage = err.error.message
        }
      );
  }

  public alterarStatusLoading(status: boolean) {
    this.loading = status;
  }

}
