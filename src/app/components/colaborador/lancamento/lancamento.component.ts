import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ColaboradorService} from "../../../service/colaborador.service";
import {TokenService} from "../../../service/token.service";
import {FormBase} from "../../../shared/util/FormBase";
import {FormBuilder} from "@angular/forms";
import {PagamentoService} from "../../../service/pagamento.service";
import {ToastrService} from "ngx-toastr";
import {BasicValidators} from "../../../shared/util/basic-validators";
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LancamentoColComponent extends FormBase implements OnInit {

  pagamento: any;
  msgError: any
  colaborador: any;
  pagamentotDialog: boolean = false;
  id: any;
  dataMaxima = new Date();
  dataMinima = new Date();

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private colaboradorService: ColaboradorService,
    private tokenService: TokenService,
    public formBuilder: FormBuilder,
    private pagamentoService: PagamentoService,
    private toast: ToastrService,
    private confirmationService: ConfirmationService,

  ) {

    super();
    this.colaborador = this.buscaUsuarioLogadoPorEmail();

    }

  ngOnInit(): void {
    this.setForm();
    this.buscaUsuarioLogadoPorEmail();

  }

  private setForm() {
      this.form = this.formBuilder.group({
      data: [null, BasicValidators.obrigatorio('A data é obrigatória.')],
      colaboradorId: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
      id: [null],
      valorDia: [null],
      situacao: [null],
      status: ['0']
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


  buscaUsuarioLogadoPorEmail() {
    this.colaboradorService
      .buscarColaboradorEmail(this.tokenService.getUserName())
      .subscribe(
        (colaborador) => {
          this.colaborador = (colaborador['colaborador']);
          if (this.colaborador != '0') {
            this.buscaPagamentoIdCol(colaborador['id'])
            this.colaborador = colaborador;
            // console.log(colaborador)
          }
        },
        (error) => {
          error.message('não é colaborador')
        }
      );
  }

  buscaPagamentoIdCol(id: number) {

    this.colaboradorService.listaPagamentoIdCol(id).subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        console.log(this.pagamento)

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  salvarPagamento() {
    if (this.form.valid) {
      let colaboradorId = this.form.get('colaboradorId').value
      let pagamento = {
        data: this.form.get('data').value.toLocaleDateString(),
        valorDia: this.form.get('valorDia').value,
        status: '0'
      }
      this.pagamentoService.salvarPagamentoColaborador(colaboradorId, pagamento).subscribe(
        (pagamento) => {

          this.pagamento;
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

  salvar() {
    this.validateForm();
    if (this.form.valid) {
      this.salvarPagamento();
    }
  }

  buscaValorProfissao() {
    this.colaboradorService.buscaColaboradorId(this.form.get('colaboradorId').value).subscribe(colaborador => {
      this.colaboradorService.buscaProfissaoColabIdPro(colaborador['profissaoId']).subscribe(profissao => {
        this.form.get('valorDia').setValue(profissao['valorDia']);
      })

    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
