import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PagamentoService} from "../../../service/pagamento.service";
import {ToastrService} from "ngx-toastr";
import {Table} from "primeng/table";
import {UsuarioService} from "../../../service/usuario.service";
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder} from "@angular/forms";
import {BasicValidators} from "../../../shared/basic-validators";
import {ProfissaoService} from "../../../service/profissao.service";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent extends FormBase implements OnInit {
  pagamento: any;
  msgError: any;
  nomeColaborador: String;
  pagamentotDialog: boolean = false;
  usuarios: any;
  dataMaxima = new Date();
  dataMinima = new Date();
  edicao: boolean = false;
  data: any;


  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private pagamentoService: PagamentoService,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
    private profissaoService: ProfissaoService,
  ) {

    super();
    this.pagamento = this.buscarPagamento();
    this.buscarUsuarios();
    this.dataMinima.setDate(this.dataMinima.getDate() - 30);
  }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      data: [null, BasicValidators.obrigatorio('A data é obrigatória.')],
      colaboradorId: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
      id: [null],
      valorDia: [null],
      situacao: [null]
    });
  }

  limpar() {
    this.form.reset()
    this.setForm()

  }


  abrirDialogPagamento() {
    this.form.reset()
    this.setForm()
    this.pagamentotDialog = true;

  }

  fecharDialogPagamento() {
    this.pagamentotDialog = false;
  }


  getEventValue($event: any): string {
    return $event.target.value;
  }

  buscarPagamento() {
    this.pagamentoService.listPagamento().subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  buscarUsuarios() {
    this.usuarioService.listColaborador().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  retornaNomeColaborador(id: number) {
    this.usuarioService.buscaPorId(id).subscribe(data => {
      this.nomeColaborador = data['nome']

    })
  }

  ret(id: number) {
    this.retornaNomeColaborador(id)
    return this.nomeColaborador;

  }

  formatarPreco(preco: number) {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(preco);
  }

  salvarPagamento() {
    this.edicao = false;
    if (this.form.valid) {
      let colaboradorId = this.form.get('colaboradorId').value
      let pagamento = {
        data: this.form.get('data').value.toLocaleDateString(),
        valorDia: this.form.get('valorDia').value
      }
      this.pagamentoService.salvarPagamento(colaboradorId, pagamento).subscribe(
        (pagamento) => {

          this.buscarPagamento();
          this.toast.success('Lançamento Salvo com sucesso!');
          this.pagamentotDialog = false;
        },
        (error) => {
          this.pagamentotDialog = false;
          if (error.status === 500) {
            this.msgError = [
              {severity: 'error', summary: 'Erro', detail: 'Entre em contato com seu administrador!'},
            ];
          } else {
            this.msgError = [
              {severity: 'error', summary: 'Erro', detail: error.error.message},
            ];
          }
        }
      );
    }
  }


  editar(id: number) {
    this.pagamentoService.buscaPorId(id).subscribe(pagamento => {
        this.edicao = true;
        this.form.get('data').setValue(pagamento['data']);
        this.data = pagamento['data'];
        this.form.get('colaboradorId').setValue(pagamento['colaboradorId']);
        this.form.get('id').setValue(pagamento['id']);
        this.form.get('valorDia').setValue(pagamento['valorDia']);
        this.form.get('situacao').setValue(pagamento['situacao']);
        this.pagamentotDialog = true;
      }
    )
  }

  atualizarLancamento(pagamento: any) {
    if (this.data !== pagamento.data) {
      pagamento.data = pagamento.data.toLocaleDateString()
    }
    this.pagamentoService.editarPagamento(pagamento).subscribe(pagamento => {
        this.buscarPagamento();
        this.toast.success('Lançamento alterado com sucesso!');
        this.pagamentotDialog = false;
        this.edicao = false;
      },
      (error) => {
        this.pagamentotDialog = false;
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
      }
    );

  }

  buscaValorProfissao() {
    this.usuarioService.buscaPorId(this.form.get('colaboradorId').value).subscribe(usuario => {
      this.profissaoService.listProfissaoIdPro(usuario['profissaoId']).subscribe(profissao => {
        this.form.get('valorDia').setValue(profissao['valorDia']);
      })

    })
  }

  salvar() {
    this.validateForm();
    if (this.form.valid) {
      if (this.edicao) {
        this.atualizarLancamento(this.form.value);
      } else {
        this.salvarPagamento();
      }
    }
  }
}


