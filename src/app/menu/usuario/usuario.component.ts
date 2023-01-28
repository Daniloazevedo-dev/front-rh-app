import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/FormBase';
import { FormBuilder } from '@angular/forms';
import { BasicValidators } from 'src/app/shared/basic-validators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService]
})
export class UsuarioComponent extends FormBase implements OnInit {

  roles: any[];
  role: any;
  msgs: any;
  usuarios: any[];
  usuario: any;
  usuariotDialog: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    super();

    this.usuarios = [
      {
        nome: "Teste",
        email: "teste@gmail.com",
        roles: [
          {id: '1',roleName: 'ADMIN'},
          {id: '1',roleName:'COLABORADOR'}
        ]
      },
      {
        nome: "teste2",
        email: "teste2@gmail.com",
        roles: [
          {id: '1',roleName:'COLABORADOR'}
        ]
      }
    ];

    this.roles = [
      {id: '1',roleName: 'ADMIN'},
      {id: '1',roleName:'COLABORADOR'},
      {id: '1',roleName:'DIRETOR'},
      {id: '1',roleName:'FINANCEIRO'}
     ];
   }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      email: [null, BasicValidators.obrigatorio('O email é obrigatório.')],
      senha: [null, BasicValidators.obrigatorio('A senha é obrigatório.')],
      role: [null, BasicValidators.obrigatorio('A role é obrigatório.')]
    });
  }

  salvar() {
    this.validateForm();
    if(this.form.valid) {
      console.log(this.form.value)
      this.messageService.add({key: 'tr',severity:'success', summary: 'Sucesso', detail: 'Usuário Salvo com sucesso!'});
    }
  }

  getEventValue($event:any) :string {
    console.log($event.target.value);
    return $event.target.value;
  }

  abrirDialogUsuario() {
    this.usuariotDialog = true;
  }

  fecharDialogUsuario() {
    this.usuariotDialog = false;
  }

}
