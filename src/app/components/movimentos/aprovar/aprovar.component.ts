import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Table} from "primeng/table";
import {FormBuilder} from "@angular/forms";
import {AprovarService} from "../../../service/aprovar.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {PagamentoService} from "../../../service/pagamento.service";

@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.component.html',
  styleUrls: ['./aprovar.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AprovarComponent implements OnInit {


  @ViewChild('filter') filter!: ElementRef;

  pagamento: any;
  msgError: any;
  status: any;
  pagamentotDialog: boolean = false;
  validaReprovado: any = '2';
  aprovado: any;
  reprovado: any;
  statusOptions: any[];
  value1: string = "0";
  value2: number;
  botaoStatus: boolean;
  botaoLabel: string;
  botaoEstilo: string;
  pagamentoAguardando: any;
  pagamentoReprovado: any;


  constructor(
    private toast: ToastrService,
    public formBuilder: FormBuilder,
    private aprovarService: AprovarService,
    private confirmationService: ConfirmationService,
    private pagamentoService: PagamentoService,
  ) {
    // super();
    // this.pagamento = this.buscarPagamentoStatus();
    this.pagamento = this.buscarPagamento();
    this.aprovado = '1';
    this.reprovado = '2';
    this.statusOptions = [{label: 'Aguardando', value: '0'}, {label: 'Reprovado', value: '2'}];

  }

  ngOnInit(): void {

  }

  pagamentoFiltro(status) {
    this.validaReprovado = status;
    if (status === '0') {
      this.botaoLabel = 'Aguardando';
      this.botaoEstilo = 'p-button-secondary';
      this.botaoStatus = true;
      this.pagamento = this.pagamentoAguardando
    } else {
      this.botaoLabel = 'Reprovado';
      this.botaoEstilo = 'p-button-info';
      this.botaoStatus = false;
      this.pagamento = this.pagamentoReprovado
    }
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  formatarPreco(preco: number) {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(preco);
  }

  buscarPagamento(status: string = '0') {
    const boleanStatus = status === '1' || status === '0' ? true : false
    this.pagamentoService.listPagamento().subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        this.pagamentoAguardando = this.pagamento.filter(p => p.status === '0')
        this.pagamentoReprovado = this.pagamento.filter(p => p.status === '2')
        this.botaoLabel = boleanStatus === true ? 'Reprovado' : 'Aguardando';
        this.botaoEstilo = boleanStatus === true ? 'p-button-info' : 'p-button-secondary';
       
        if (this.value1 === '0' && status === '2') {
          this.pagamento = this.pagamentoAguardando
        } else if (this.value1 === '2' && status === '1') {
          this.pagamento = this.pagamentoReprovado
        } else {
          this.pagamento = boleanStatus === true ? this.pagamentoAguardando : this.pagamentoReprovado;
        }

        this.botaoStatus = boleanStatus;

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  alterarStatus(id: number, status: string) {
    this.aprovarService.editarPagamentoStatus(id, status).subscribe(pagamento => {
      this.buscarPagamento(status);
      
      if (status === '1') {
        this.toast.success('Lançamento aprovado com sucesso!');
      }
      if (status === '2') {
        this.toast.warning('Lançamento reprovado com sucesso!');
      }
    }, (error) => {
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
    })

  }

  editaStatusAprovado(id: number, status: string) {
    this.confirmationService.confirm({
      message: 'Está certo em aprovar a diária?',
      accept: () => {
        this.alterarStatus(id, status)
      }
    });
  }

  editaStatusReprovado(id: number, status: string) {
    this.confirmationService.confirm({
      message: 'Está certo em reprovar a diária?',
      accept: () => {
        this.alterarStatus(id, status)
      }
    });
  }
}
