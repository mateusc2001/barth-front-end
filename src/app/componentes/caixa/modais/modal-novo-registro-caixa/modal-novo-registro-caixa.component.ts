import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Builder } from 'builder-pattern';
import { ModalAplicarRegistroExtratoService } from 'src/app/componentes/modais/aplicar-registro-extrato/service/modal-aplicar-registro-extrato.service';
import { NovoRegistroCaixa } from '../../model/novo-registro-caixa.model';

@Component({
  selector: 'app-modal-novo-registro-caixa',
  templateUrl: './modal-novo-registro-caixa.component.html',
  styleUrls: ['./modal-novo-registro-caixa.component.css']
})
export class ModalNovoRegistroCaixaComponent implements OnInit {

  public formGroupCadastroCliente: FormGroup;
  public destinos: any[] = [];
  public contaFixa: any = '';

  favoriteSeason: any = null;
  seasons = [
    {
      text: 'Entrada',
      value: true
    },
    {
      text: 'Saída',
      value: false
    }
  ];

  constructor(private modalAplicarRegistroExtratoService: ModalAplicarRegistroExtratoService,
    private formBuilder: FormBuilder) {
    this.formGroupCadastroCliente = this.formBuilder.group({
      txtDataFinal: new FormControl((new Date()), Validators.required),
      txtValor: new FormControl('', Validators.required),
      txtDescricao: new FormControl('', Validators.required),
      txtIdUsuario: new FormControl('', Validators.required),
      entrada: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalAplicarRegistroExtratoService.buscarUsuarios()
      .subscribe(res => this.destinos = res);
  }

  public emitOnClose(): NovoRegistroCaixa {
    return Builder<NovoRegistroCaixa>()
      .descricao(this.formGroupCadastroCliente.controls.txtDescricao.value)
      .entrada(this.formGroupCadastroCliente.controls.entrada.value)
      .valor(this.formGroupCadastroCliente.controls.txtValor.value)
      .build();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value?.toISOString());
  }

  consoleLog(picker: any) {
    console.log(picker);
  }
}
