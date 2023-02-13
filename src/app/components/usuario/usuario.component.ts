import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/FormBase';
import { FormBuilder } from '@angular/forms';
import { BasicValidators } from 'src/app/shared/basic-validators';
import { MessageService } from 'primeng/api';
import { RoleService } from 'src/app/service/role.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class UsuarioComponent extends FormBase implements OnInit {

  roles: any;
  role: any;
  msgs: any;
  msgError: any;
  usuarios: any;
  usuario: any;
  usuariotDialog: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) {
    super();
    this.usuarios = this.buscarUsuarios();
    this.buscarRoles();
   }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      email: [null, BasicValidators.obrigatorio('O email é obrigatório.')],
      password: [null, BasicValidators.obrigatorio('A senha é obrigatório.')],
      roles: [null, BasicValidators.obrigatorio('A role é obrigatório.')]
    });
  }

  salvar() {
    this.validateForm();
    if(this.form.valid) {
      this.salvarUsuarios(this.form.value);
    }
  }

  getEventValue($event:any) :string {
    return $event.target.value;
  }

  abrirDialogUsuario() {
    this.form.reset();
    this.usuariotDialog = true;
  }

  fecharDialogUsuario() {
    this.usuariotDialog = false;
  }

  buscarRoles() {
    this.roleService.listRoles().subscribe(roles => {
      this.roles = roles;
    },
    error => {
      this.msgError = [{severity:'error', summary:'Erro', detail: error.error.message}];
    });
  }

  buscarUsuarios() {
    this.usuarioService.listUsuarios().subscribe(usuarios => {
     this.usuarios = usuarios;
    },
    error => {
      this.msgError = [{severity:'error', summary:'Erro', detail: error.error.message}];
    });
  }

 salvarUsuarios(usuario: any) {
    this.usuarioService.salvarUsuario(usuario).subscribe(usuario => {
      this.buscarUsuarios();
      this.messageService.add({key: 'tr',severity:'success', summary: 'Sucesso', detail: 'Usuário Salvo com sucesso!'});
      this.usuariotDialog = false;
    },
    error => {
      this.usuariotDialog = false;
      this.msgError = [{severity:'error', summary:'Erro', detail: error.error.message}];
    });
  }

  deletarUsuario(id: Number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.usuarioService.deleteUsuario(id).subscribe( res => {
          this.messageService.add({key: 'tr',severity:'success', summary: 'Sucesso', detail: 'Usuário deletado com sucesso!'});
          this.buscarUsuarios();

        },
        error => {
          this.msgError = [{severity:'error', summary:'Erro', detail: error.error.message}];
        });
      }
    })
  }

  tratarRolesSepparaPorVirgula(listRoles: any) {
    return listRoles.map((role: { roleName: any; }) => role.roleName).join(', ');
  }

}
