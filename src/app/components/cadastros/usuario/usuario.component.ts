import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBase} from 'src/app/shared/util/FormBase';
import {FormBuilder} from '@angular/forms';
import {BasicValidators} from 'src/app/shared/util/basic-validators';
import {MessageService} from 'primeng/api';
import {RoleService} from 'src/app/service/role.service';
import {UsuarioService} from 'src/app/service/usuario.service';
import {ConfirmationService} from 'primeng/api';
import {TokenService} from 'src/app/service/token.service';
import {ToastrService} from 'ngx-toastr';
import {CepServiceService} from 'src/app/service/cep-service.service';
import {Table} from "primeng/table";

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
  numero: any;
  statusOptions: any[];
  value1: string = "ATIVO";
  value2: number;
  usuarioAtivo: any;
  usuarioInativo: any;
  botaoSituacao: boolean;
  botaoLabel: string;
  botaoEstilo: string;
  status: any;


  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private tokentService: TokenService,
    private toast: ToastrService,
    private cepservice: CepServiceService,
  ) {
    super();
    this.usuarios = this.buscarUsuarios();
    this.buscarRoles();
    this.statusOptions = [{label: 'Ativo', value: 'ATIVO'}, {label: 'Inativo', value: 'INATIVO'}];
  }

  populaForm(dados, form) {

    this.form.patchValue({
      logradouro: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      complemento: dados.complemento,
      localidade: dados.localidade,
      uf: dados.uf
    })
  }

  consultaCep(valor, form) {


    this.cepservice.buscar(valor.value)
      .subscribe((dados) => this.populaForm(dados, form));

  }

  ngOnInit(): void {
    this.setForm();

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  private setForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      cpf: ['', BasicValidators.obrigatorio('O CPF é obrigatório.')],
      rg: ['', BasicValidators.obrigatorio('O RG é obrigatório.')],
      colaborador: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
      email: [null, BasicValidators.email],
      telefone: [null, BasicValidators.obrigatorio('O celular é obrigatório.')],
      cep: [null, BasicValidators.cep],
      bairro: [null, BasicValidators.obrigatorio('O Bairro é obrigatório')],
      localidade: [null, BasicValidators.obrigatorio('Localidade é Obrigatória')],
      logradouro: [null, BasicValidators.obrigatorio('A Rua  é obrigatória')],
      numero: [null, BasicValidators.obrigatorio('Número é Obrigatório')],
      complemento: [],
      uf: [null, BasicValidators.obrigatorio('O Estado é Obrigatório')],
      situacao: [],
      password: [],
      roles: [null, BasicValidators.obrigatorio('A role é obrigatório.')],
    });
  }

  salvar() {
    this.validateForm();
    if (this.form.valid) {
      if (this.edicao) {
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
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  buscarUsuarios(situacao: string = 'INATIVO') {
    const boleanSituacao = situacao === 'INATIVO' ? true : false
    this.usuarioService.listUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.usuarioAtivo = this.usuarios.filter(p => p.situacao === 'ATIVO')
        this.usuarioInativo = this.usuarios.filter(p => p.situacao === 'INATIVO')
        this.botaoLabel = boleanSituacao === true ? 'Desativar' : 'Ativar';
        this.botaoEstilo = boleanSituacao === true ? 'p-button-secondary' : 'p-button-info';
        this.usuarios = boleanSituacao === true ? this.usuarioAtivo : this.usuarioInativo;
        this.botaoSituacao = boleanSituacao;
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  salvarUsuarios(usuario: any) {
    let endereco = {
      cep: usuario.cep,
      logradouro: usuario.logradouro,
      numero: usuario.numero,
      bairro: usuario.bairro,
      complemento: usuario.complemento,
      localidade: usuario.localidade,
      uf: usuario.uf,
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
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  atualizarUsuarios(usuario: any) {

    let endereco = {
      cep: usuario.cep,
      logradouro: usuario.logradouro,
      numero: usuario.numero,
      bairro: usuario.bairro,
      complemento: usuario.complemento,
      localidade: usuario.localidade,
      uf: usuario.uf,
    }

    usuario.endereco = endereco


    this.usuarioService.atualizarUsuario(usuario).subscribe(
      (usuario) => {
        this.buscarUsuarios();
        this.toast.success('Usuário atualizado com sucesso!');
        this.usuariotDialog = false;
      },
      (error) => {
        this.usuariotDialog = false;
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  usuarioFiltro(situacao) {
    if (situacao === 'ATIVO') {
      this.botaoLabel = 'Desativar';
      this.botaoEstilo = 'p-button-secondary';
      this.botaoSituacao = true;
      this.usuarios = this.usuarioAtivo
    } else {
      this.botaoLabel = 'Ativar';
      this.botaoEstilo = 'p-button-info';
      this.botaoSituacao = false;
      this.usuarios = this.usuarioInativo
    }
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
        this.form.get('rg').setValue(data['rg']);
        this.form.get('situacao').setValue(data['situacao']);
        this.form.get('colaborador').setValue(data['colaborador'] != '1' ? '0' : '1');
        this.form.get('email').setValue(data['email']);
        this.form.get('telefone').setValue(data['telefone']);
        this.form.get('roles').setValue(data['roles']);
        this.form.get('cep').setValue(data['endereco'].cep);
        this.form.get('logradouro').setValue(data['endereco'].logradouro);
        this.form.get('numero').setValue(data['endereco'].numero);
        this.form.get('bairro').setValue(data['endereco'].bairro);
        this.form.get('complemento').setValue(data['endereco'].complemento);
        this.form.get('localidade').setValue(data['endereco'].localidade);
        this.form.get('uf').setValue(data['endereco'].uf);
        this.usuariotDialog = true;
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }


  tratarRolesSepparaPorVirgula(listRoles: any) {
    return listRoles.map((role: { roleName: any }) => role.roleName).join(', ');
  }

  tratarEndereco(listEnd: any) {
    return listEnd.map((endereco: { rua: any }) => endereco.rua).join(', ');
  }

  validaUsuarioLogado(email: String) {
    return this.tokentService.getUserName() === email;
  }

  trataColaborador(colaborador: String) {
    return colaborador === '1' ? 'Sim' : 'Não';
  }

  alterarSituacao(id: number, situacao: string) {
    this.usuarioService.editarSituacao(id, situacao).subscribe(pagamento => {
      this.buscarUsuarios(situacao);
      this.toast.success('Situacao alterada com sucesso!');
    }, (error) => {
      this.usuariotDialog = false;
      this.edicao = false;
      if (error.status === 500) {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: 'Entre em contato com seu administrador!'},
        ];
      } else {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    })

  }

  editaSituacao(id: number, situacao: string) {
    this.confirmationService.confirm({
      message: 'Alterar a Situção?',
      accept: () => {
        this.alterarSituacao(id, situacao.toUpperCase())
        window.close();
      }
    });
  }
}
