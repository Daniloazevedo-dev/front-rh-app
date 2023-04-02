import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfissaoService} from "../../../service/profissao.service";
import {Table} from "primeng/table";
import {ToastrService} from "ngx-toastr";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBase} from "../../../shared/util/FormBase";
import {FormBuilder} from "@angular/forms";
import {BasicValidators} from "../../../shared/util/basic-validators";


@Component({
  selector: 'app-profissao',
  templateUrl: './profissao.component.html',
  styleUrls: ['./profissao.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfissaoComponent extends FormBase implements OnInit {
  profissao: any;
  msgError: any;
  edicao: boolean = false;
  botaoLabel: string;
  botaoEstilo: string;
  profissaoDialog: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    private profissaoService: ProfissaoService,
    private toast: ToastrService,
    private confirmationService: ConfirmationService
  ) {
    super();
    this.buscarProfissao();



  }

  ngOnInit(): void {
    this.setForm()


  }
  private setForm() {
    this.form = this.formBuilder.group({
      id: [''],
      descricao: ['', BasicValidators.obrigatorio('A Descrição é obrigatória.')],
      valorDia: ['', BasicValidators.obrigatorio('O Valor do Dia é obrigatório.')],

    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  tratarSituacao(situacao: string) {
    if (situacao === 'ATIVO') {
      return 'DESATIVAR';

    } else {
      return 'ATIVAR';
    }

  }

  tratarcorbutao(situacao: string) {
    return situacao === 'ATIVO' ? 'p-button-secondary' : 'p-button-info';
  }

  editarProfissao(id: number, situacao: string) {
    let acao;
    let mensagem;
    if (situacao === 'ATIVO') {
      mensagem = 'Ativado com Sucesso';
      acao = 'ativar';
      situacao = 'INATIVO'

    } else {
      acao = 'desativar';
      mensagem = 'Desativado com Sucesso';
      situacao = 'ATIVO'
    }
    this.confirmationService.confirm({
      message: `Tem certeza que deseja ${acao}?`,
      accept: () => {

        this.profissaoService.editarSituacao(id, situacao).subscribe(profissao => {
          this.buscarProfissao();
          this.toast.success(mensagem);
        })
      }
    });
  }

  buscarProfissao() {
    this.profissaoService.listProfissao().subscribe(
      (profissao) => {
        this.profissao = profissao;

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summer: 'Erro', detail: error.error.message},
        ];
      }
    );
  }
  abrirDialogProfissao() {
    this.form.reset();
    this.setForm();

    this.profissaoDialog = true;
  }

  fecharDialogProfissao() {
    this.profissaoDialog = false;
  }
  salvarProfissao(profissao: any) {
    this.profissaoService.salvarProfissao(profissao).subscribe(
      (profissao) => {
        this.buscarProfissao();
        this.toast.success('Profissão Salva com sucesso!');
        this.profissaoDialog = false;
      },
      (error) => {
        this.profissaoDialog = false;
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }
  salvar() {
    this.validateForm();
    if (this.form.valid) {

        this.salvarProfissao(this.form.value);
      }
    }
  }

