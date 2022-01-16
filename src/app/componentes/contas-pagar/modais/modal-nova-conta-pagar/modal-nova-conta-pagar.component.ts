import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ModalAplicarRegistroExtratoService } from 'src/app/componentes/modais/aplicar-registro-extrato/service/modal-aplicar-registro-extrato.service';

@Component({
  selector: 'app-modal-nova-conta-pagar',
  templateUrl: './modal-nova-conta-pagar.component.html',
  styleUrls: ['./modal-nova-conta-pagar.component.css']
})
export class ModalNovaContaPagarComponent implements OnInit {

  public formGroupCadastroCliente: FormGroup;
  public destinos: any[] = [];
  public contaFixa: any = '';

  constructor(private modalAplicarRegistroExtratoService: ModalAplicarRegistroExtratoService,
              private formBuilder: FormBuilder) {
    this.formGroupCadastroCliente = this.formBuilder.group({
      txtDataFinal: new FormControl((new Date()), Validators.required),
      txtValor: new FormControl('', Validators.required),
      txtDescricao: new FormControl('', Validators.required),
      txtIdUsuario: new FormControl('', Validators.required),
      contaFixa: new FormControl(false, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalAplicarRegistroExtratoService.buscarUsuarios()
      .subscribe(res => this.destinos = res);
  }

  public emitOnClose(): any {
    return {
      dataFinal: this.formGroupCadastroCliente.controls.txtDataFinal.value,
      descricao: this.formGroupCadastroCliente.controls.txtDescricao.value,
      valor: this.formGroupCadastroCliente.controls.txtValor.value,
      idUsuario: this.formGroupCadastroCliente.controls.txtIdUsuario.value,
      contaFixa: this.formGroupCadastroCliente.controls.contaFixa.value
    };
  }

  public onNoClick(): void {

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value?.toISOString());
  }

  consoleLog(picker: any) {
    console.log(picker);
  }

}
