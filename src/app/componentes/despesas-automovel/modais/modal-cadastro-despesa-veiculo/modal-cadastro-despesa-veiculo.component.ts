import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cadastro-despesa-veiculo',
  templateUrl: './modal-cadastro-despesa-veiculo.component.html',
  styleUrls: ['./modal-cadastro-despesa-veiculo.component.css']
})
export class ModalCadastroDespesaVeiculoComponent implements OnInit {


  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.formGroup = this.formBuilder.group(
      {
        descricao: this.formBuilder.control('', [Validators.required, Validators.nullValidator]),
        valor: this.formBuilder.control(0, [Validators.required, Validators.nullValidator]),
      }
    );
  }

  ngOnInit(): void {
  }


  emitOnClose() {
    return {
      descricao: this.formGroup.controls.descricao.value,
      valor: this.formGroup.controls.valor.value
    }
  }
}

