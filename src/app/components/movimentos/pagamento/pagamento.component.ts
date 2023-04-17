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
  status: any = '1';
  statusOptions: any[];
  value1: string = "1";
  value2: number;
  labelBotao: String = 'Pagar';


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
    if (status.value1 === '1') {
      this.status = '1';
      this.labelBotao = 'Pagar';


    } else {
      this.status = '3';
      this.labelBotao = 'Estornar'

    }
    this.setFormPagar();
    this.pagamento = [];
    this.colId = '';
    this.mes = null;
    this.total = 0;

  }


  buscarPagamento(colaboradorId: number, dataInicio: String, dataFim: String, status: string) {


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
      console.log(this.status)
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
        message: this.status === '3' ? 'Realizar estorno?' : 'Realizar pagamento?',
        accept: () => {
          this.status = this.status === '1' ? '3' : '1';
          this.pagamentoService.pagarCololaborador(this.colId, dataInicio.toLocaleDateString(), dataFim.toLocaleDateString(), this.status).subscribe(
            (pagamento) => {
              this.setFormPagar();
              this.pagamento = [];
              this.colId = '';
              this.mes = null;
              this.total = 0;

              if (this.status === 1) {
                this.toast.success('Pagamento realizado com sucesso!')
              } else {
                this.toast.warning('Estorno realizado com sucesso!')
              }
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
