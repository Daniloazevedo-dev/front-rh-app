import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PagamentoService} from "../../../service/pagamento.service";
import {ToastrService} from "ngx-toastr";
import {Table} from "primeng/table";
import {UsuarioService} from "../../../service/usuario.service";
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder} from "@angular/forms";
import {BasicValidators} from "../../../shared/basic-validators";

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

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private pagamentoService: PagamentoService,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder,
  ) {

    super();
    this.pagamento = this.buscarPagamento();
    this.buscarUsuarios();
  }

  ngOnInit(): void {
    this.setForm();
  }

  private setForm() {
    this.form = this.formBuilder.group({
      data: [null, BasicValidators.obrigatorio('A data é obrigatória.')],
      colaborador: [null, BasicValidators.obrigatorio('O Colaborador é obrigatório.')],
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
        console.log(this.pagamento)
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
        console.log(this.usuarios);
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
    // console.log()
    this.validateForm();
    if (this.form.valid) {
      let colaboradorId = this.form.get('colaborador').value
      let pagamento = {
        data: this.form.get('data').value.toLocaleDateString()
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
}


