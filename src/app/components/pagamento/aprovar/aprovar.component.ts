import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Table} from "primeng/table";
import {FormBuilder} from "@angular/forms";
import {AprovarService} from "../../../service/aprovar.service";
import {ConfirmationService, MessageService} from "primeng/api";

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
  nomeStatus: any;
  aprovado: any;
  reprovado: any;

  constructor(
    private toast: ToastrService,
    public formBuilder: FormBuilder,
    private aprovarService: AprovarService,
    private confirmationService: ConfirmationService,

  )
  {
    // super();
    this.pagamento = this.buscarPagamentoStatus(0);
    this.aprovado = '1';
    this.reprovado = '2';
     }

  ngOnInit(): void {

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

  buscarPagamentoStatus(status: any) {
    this.aprovarService.listaPagamentoStatus('0').subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        if((pagamento['status']) = '0'){
          this.nomeStatus = 'Aguardando Aprovação'
        }
        console.log(this.pagamento.status)
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  alterarPagamentoStatus(id: number, status: string) {
    this.aprovarService.editarPagamentoStatus(id, status).subscribe(pagamento => {
      this.buscarPagamentoStatus(status);
      this.toast.success('Status alterado com sucesso!');
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
        this.alterarPagamentoStatus(id, status)
      }
    });
  }
  editaStatusReprovado(id: number, status: string) {
    this.confirmationService.confirm({
      message: 'Está certo em reprovar a diária?',
      accept: () => {
        this.alterarPagamentoStatus(id, status)
      }
    });
  }
}
