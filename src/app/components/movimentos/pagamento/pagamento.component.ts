import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../../service/usuario.service";
import {PagamentoService} from "../../../service/pagamento.service";
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBase} from "../../../shared/util/FormBase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PagamentoComponent extends FormBase implements OnInit {

  usuarios: any;
  msgError: any;
  pagamento: any;
  pagForm: FormGroup;
  colaboradorId: number;
  mes: Date;
  colId: any;
  total: any = 0.0;
  status: any ;
  pagamentoPagar: any;
  pagamentoPago: any;
  botaoStatus: boolean;
  botaoLabel: string;
  botaoEstilo: string;
  statusOptions: any[];
  value1: string = "0";
  value2: number;
  aprovado: any;
  pago: any;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public formBuilderPag: FormBuilder,
    private usuarioService: UsuarioService,
    private pagamentoService: PagamentoService,
    private confirmationService: ConfirmationService,
    private toast: ToastrService,
  ) {
    super();
    this.buscarUsuarios();
    this.aprovado = '1';
    this.pago = '2';
    this.statusOptions = [{label: 'Pagar', value: '1'}, {label: 'Pago', value: '3'}];

  }

  ngOnInit(): void {
    this.setFormPagar();

  }

  private setFormPagar() {
    this.pagForm = this.formBuilderPag.group({
      idPag: [null, Validators.required],
      mesPag: [null, Validators.required],
      anoPag: [null, Validators.required]

    });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  formatarPreco(preco: number) {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(preco);
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

  pagamentoFiltro(status) {
       if (status === '0') {
      this.botaoLabel = 'Pagar';
      this.botaoEstilo = 'p-button-secondary';
      this.botaoStatus = true;
      this.pagamento = this.pagamentoPagar
    } else {
      this.botaoLabel = 'Pago';
      this.botaoEstilo = 'p-button-info';
      this.botaoStatus = false;
      this.pagamento = this.pagamentoPago
    }
  }

  buscarPagamento(colaboradorId: number, dataInicio: String, dataFim: String, status: any) {
    console.log(status);

    this.pagamentoService.buscaColPagar(colaboradorId, dataInicio, dataFim, status).subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        this.total = 0.0;
        this.pagamento.forEach(p => this.total += p.valorDia)

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  getColId(colId: any) {
    this.colId = colId;
    this.validaBusca();
  }

  getMes(mes: any) {
    this.mes = mes;
    this.validaBusca();
  }

  validaBusca() {
    if (this.colId && this.mes) {
      let dataInicio = new Date(this.mes.getFullYear(), this.mes.getMonth(), 1);
      let dataFim = new Date(this.mes.getFullYear(), this.mes.getMonth() + 1, 0);
      this.buscarPagamento(this.colId, dataInicio.toLocaleDateString(), dataFim.toLocaleDateString(), this.status);

    }

  }

  pagarColaborador() {
    if (this.colId && this.mes) {
      let dataInicio = new Date(this.mes.getFullYear(), this.mes.getMonth(), 1);
      let dataFim = new Date(this.mes.getFullYear(), this.mes.getMonth() + 1, 0);
      this.confirmationService.confirm({
        message: 'Realizar pagamento?',
        accept: () => {
          this.pagamentoService.pagarCololaborador(this.colId, dataInicio.toLocaleDateString(), dataFim.toLocaleDateString(), this.status).subscribe(
            (pagamento) => {
              this.buscarPagamento(this.colId, dataInicio.toLocaleDateString(), dataFim.toLocaleDateString(), this.status);
              this.toast.success('Pagamento realizado com sucesso!');
            },
            (error) => {
              this.msgError = [
                {severity: 'error', summary: 'Erro', detail: error.error.message},
              ];
            }
          )
        }
      });
    }

  }

  validaLista() {
    if (this.pagamento) {
      return this.pagamento.length <= 0;
    } else {
      return true;
    }
  }


}
