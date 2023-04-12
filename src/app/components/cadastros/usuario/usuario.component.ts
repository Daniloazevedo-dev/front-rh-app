import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/util/FormBase';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormBuilder } from '@angular/forms';
import { BasicValidators } from 'src/app/shared/util/basic-validators';
import { MessageService } from 'primeng/api';
import { RoleService } from 'src/app/service/role.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ConfirmationService } from 'primeng/api';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { CepServiceService } from 'src/app/service/cep-service.service';

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
    private toast: ToastrService,
     private cepservice : CepServiceService,
  ) {
    super();
    this.usuarios = this.buscarUsuarios();
    this.buscarRoles();
  }

    populaForm(dados, form){

   this.form.patchValue({
      bairro: dados.bairro,
      localidade:dados.localidade,
      logradouro: dados.logradouro,
      numero: dados.numero, 
      complemento: dados.complemento,
      uf: dados.uf
    })
  }
  consultaCep(valor, form){

   
   this.cepservice.buscar(valor.value)
    .subscribe((dados) => this.populaForm(dados,form));

  } 

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      cpf: ['', BasicValidators.obrigatorio('O CPF é obrigatório.')],
      colaborador: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
      email: [null, BasicValidators.email],
      cep: [null, BasicValidators.cep],
      bairro: [null, BasicValidators.obrigatorio('O Bairro é obrigatório')],
      localidade: [null, BasicValidators.obrigatorio('Localidade é Obrigatória')],
      logradouro: [null, BasicValidators.obrigatorio('A Rua  é obrigatória')], 
      numero: [null, BasicValidators.obrigatorio('Número é Obrigatório')],
      complemento: [],
      uf: [null, BasicValidators.obrigatorio('O Estado é Obrigatório')],
      situacao: ['', BasicValidators.obrigatorio('A Situacao é obrigatória.')],
      
      
      password: [
        null,
        this.edicao
          ? ''
          : BasicValidators.obrigatorio('A senha é obrigatória.'),
      ],
      roles: [null, BasicValidators.obrigatorio('A role é obrigatório.')],
    });
  }

  salvar() {
    this.validateForm();
    if (this.form.valid) {
      if(this.edicao) {
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
    let endereco =  {
             cep: usuario.cep,
             bairro:usuario.bairro,
             localidade: usuario.localidade,
             logradouro:usuario.logradouro,
             numero:usuario.numero,
             complemento:usuario.complemento,
             uf:usuario.uf,   

    }

    

    usuario.endereco = endereco;
    

    this.usuarioService.salvarUsuario(usuario).subscribe(
      (usuario) => {
        this.buscarUsuarios()
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

    let endereco =  {
      cep: usuario.cep,
      bairro:usuario.bairro,
      localidade: usuario.localidade,
      logradouro:usuario.logradouro,
      numero:usuario.numero,
      complemento:usuario.complemento,
      uf:usuario.uf, 
}

usuario.endereco =endereco

    console.log(usuario.numero)
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
        this.form.get('cpf').setValue(data['cpf']);
        this.form.get('colaborador').setValue(data['colaborador'] != '1' ? '0' : '1');
        this.form.get('email').setValue(data['email']);
        this.form.get('roles').setValue(data['roles']);
        this.form.get('cep').setValue(data['endereco'].cep);
        this.form.get('complemento').setValue(data['endereco'].complemento);
        this.form.get('bairro').setValue(data['endereco'].bairro);
        this.form.get('localidade').setValue(data['endereco'].localidade);
        this.form.get('logradouro').setValue(data['endereco'].logradouro);
        this.form.get('numero').setValue(data['endereco'].numero);
        this.form.get('uf').setValue(data['endereco'].uf);
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
