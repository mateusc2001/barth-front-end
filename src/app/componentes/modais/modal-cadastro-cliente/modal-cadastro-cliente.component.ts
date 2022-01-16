import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Builder } from 'builder-pattern';
import { UsuarioLogadoModel } from 'src/app/model/usuario-logado.model';
import { NovoUsuarioModel } from './model/novo-usuario.model';

@Component({
  selector: 'app-modal-cadastro-cliente',
  templateUrl: './modal-cadastro-cliente.component.html',
  styleUrls: ['./modal-cadastro-cliente.component.css']
})
export class ModalCadastroClienteComponent implements OnInit {

  public formGroupCadastroCliente: FormGroup;
  public initImage: any = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';
  public url: any;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupCadastroCliente = this.formBuilder.group({
      txtNomeCompleto: new FormControl('', Validators.required),
      txtUsuario: new FormControl('', Validators.required),
      txtSenha: new FormControl('', Validators.required),
      txtConfirmacaoSenha: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.url = this.initImage;
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
    const txtSenha = this.formGroupCadastroCliente.controls.txtSenha.value;
    const txtConfirmacaoSenha = this.formGroupCadastroCliente.controls.txtConfirmacaoSenha.value;
    return !this.formGroupCadastroCliente.controls.txtNomeCompleto.valid
      || !this.formGroupCadastroCliente.controls.txtUsuario.valid
      || !this.formGroupCadastroCliente.controls.txtSenha.valid
      || !this.formGroupCadastroCliente.controls.txtConfirmacaoSenha.valid
      || txtSenha !== txtConfirmacaoSenha;
  }

  public emitOnClose(): any {
    if (!this.desabilitarBtnSalvar()) {
      return Builder<NovoUsuarioModel>()
        .nomeCompleto(this.formGroupCadastroCliente.controls.txtNomeCompleto.value)
        .usuario(this.formGroupCadastroCliente.controls.txtUsuario.value)
        .senha(this.formGroupCadastroCliente.controls.txtSenha.value)
        .base64image(this.url)
        .build();
    }
  }

  public onNoClick(): void {

  }
}
