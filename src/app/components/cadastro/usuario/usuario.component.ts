import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/FormBase';
import { FormBuilder } from '@angular/forms';
import { BasicValidators } from 'src/app/shared/basic-validators';
import { MessageService } from 'primeng/api';
import { RoleService } from 'src/app/service/role.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ConfirmationService } from 'primeng/api';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UsuarioComponent extends FormBase implements OnInit {
  roles: any;
  role: any;
  msgs: any;
  msgError: any;
  usuarios: any;
  usuario: any;
  usuariotDialog: boolean = false;
  edicao: boolean = false;
  placeholderSenha: String;
  labelSalvar: String;
  colaborador: any;

  constructor(
    public formBuilder: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private tokentService: TokenService,
    private toast: ToastrService
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
      id: [''],
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      colaborador: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
      email: [null, BasicValidators.obrigatorio('O email é obrigatório.')],
      password: [
        null,
        this.edicao
          ? ''
          : BasicValidators.obrigatorio('A senha é obrigatório.'),
      ],
      roles: [null, BasicValidators.obrigatorio('A role é obrigatório.')],
    });
  }

  salvar() {
    this.validateForm();
    if (this.form.valid) {
      if(this.edicao) {
        console.log(this.form.value.colaborador)
        this.atualizarUsuarios(this.form.value);
      } else {
        this.salvarUsuarios(this.form.value);
      }
    }
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  abrirDialogUsuario() {
    this.form.reset();
    this.edicao = false;
    this.setForm();
    this.placeholderSenha = 'Informe a senha';
    this.labelSalvar = 'Salvar';
    this.usuariotDialog = true;
  }

  fecharDialogUsuario() {
    this.usuariotDialog = false;
  }

  buscarRoles() {
    this.roleService.listRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }

  buscarUsuarios() {
    this.usuarioService.listUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }

  salvarUsuarios(usuario: any) {
    this.usuarioService.salvarUsuario(usuario).subscribe(
      (usuario) => {
        this.buscarUsuarios();
        this.toast.success('Usuário Salvo com sucesso!');
        this.usuariotDialog = false;
      },
      (error) => {
        this.usuariotDialog = false;
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }

  atualizarUsuarios(usuario: any) {
    console.log(usuario.colaborador)
    this.usuarioService.atualizarUsuario(usuario).subscribe(
      (usuario) => {
        this.buscarUsuarios();
        this.toast.success('Usuário atualizado com sucesso!');
        this.usuariotDialog = false;
      },
      (error) => {
        this.usuariotDialog = false;
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }

  deletarUsuario(id: Number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.usuarioService.deleteUsuario(id).subscribe(
          (res) => {
            this.toast.success('Usuário deletado com sucesso!');
            this.buscarUsuarios();
          },
          (error) => {
            this.msgError = [
              {
                severity: 'error',
                summary: 'Erro',
                detail: error.error.message,
              },
            ];
          }
        );
      },
    });
  }

  editar(id: Number) {
    this.usuarioService.buscaPorId(id).subscribe(
      (data) => {
        this.edicao = true;
        this.placeholderSenha = 'Alterar a senha';
        this.labelSalvar = 'Alterar';
        this.setForm();
        this.form.get('id').setValue(data['id']);
        this.form.get('nome').setValue(data['nome']);
        this.form.get('colaborador').setValue(data['colaborador'] != '1' ? '0' : '1');
        this.form.get('email').setValue(data['email']);
        this.form.get('roles').setValue(data['roles']);
        this.usuariotDialog = true;
      },
      (error) => {
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }

  tratarRolesSepparaPorVirgula(listRoles: any) {
    return listRoles.map((role: { roleName: any }) => role.roleName).join(', ');
  }

  validaUsuarioLogado(email: String) {
    return this.tokentService.getUserName() === email;
  }

  trataColaborador(colaborador: String) {
    return colaborador === '1' ? 'Sim' : 'Não';
  }
}
