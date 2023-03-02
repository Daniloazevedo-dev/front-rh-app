import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PagamentoService} from "../../../service/pagamento.service";
import {ToastrService} from "ngx-toastr";
import {Table} from "primeng/table";
import {UsuarioService} from "../../../service/usuario.service";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  pagamento: any;
  msgError: any;
  nomeColaborador: String;


  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private pagamentoService: PagamentoService,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
  ) {

    // super();
    this.pagamento = this.buscarPagamento();
  }

  ngOnInit(): void {
    console.log(this.ret(10))
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
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
  }

}
