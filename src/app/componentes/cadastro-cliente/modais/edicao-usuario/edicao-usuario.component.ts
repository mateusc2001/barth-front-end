import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Builder} from 'builder-pattern';
import {NovoUsuarioModel} from '../../../modais/modal-cadastro-cliente/model/novo-usuario.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edicao-usuario',
  templateUrl: './edicao-usuario.component.html',
  styleUrls: ['./edicao-usuario.component.css']
})
export class EdicaoUsuarioComponent implements OnInit {

  public formGroupCadastroCliente: FormGroup;
  public initImage: any = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';
  public url: any;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formGroupCadastroCliente = this.formBuilder.group({
      txtNomeCompleto: new FormControl(data.nomeCompleto, Validators.required),
      txtUsuario: new FormControl(data.usuario, Validators.required)
    });
  }

  ngOnInit(): void {
    this.url = this.initImage;
    this.url = this.data.base64image;
  }

  public onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader: any = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (item: any) => { // called once readAsDataURL is completed
        if (!!item.target) { this.url = item.target.result; }
      };
    }
  }


  public desabilitarBtnSalvar(): boolean {
    return !this.formGroupCadastroCliente.controls.txtNomeCompleto.valid
      || !this.formGroupCadastroCliente.controls.txtUsuario.valid;
  }

  public emitOnClose(): any {
    if (!this.desabilitarBtnSalvar()) {
      return {
        nomeCompleto: this.formGroupCadastroCliente.controls.txtNomeCompleto.value,
        usuario: this.formGroupCadastroCliente.controls.txtUsuario.value,
        base64image: this.url,
        id: this.data.id
      };
    }
  }

  public onNoClick(): void {

  }

}
