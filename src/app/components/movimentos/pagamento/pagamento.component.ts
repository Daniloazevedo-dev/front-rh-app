import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../../service/usuario.service";
import {PagamentoService} from "../../../service/pagamento.service";
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBase} from "../../../shared/util/FormBase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PagamentoComponent extends FormBase implements OnInit {

  dataMinima: Date;
  dataMaxima: Date;
  dataInicio: any;
  dataFim: any;
  usuarios: any;
  msgError: any;
  pagamento: any;
  pagForm: FormGroup;


  @ViewChild('filter') filter!: ElementRef;

  constructor(
    public formBuilderPag: FormBuilder,
    private usuarioService: UsuarioService,
    private pagamentoService: PagamentoService,
    private confirmationService: ConfirmationService,
  ) {
    super();
    this.usuarios = this.buscarUsuarios();
    this.pagamento = this.buscarPagamento();

    var date = new Date();
    var dataMinima = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    var dataMaxima = new Date(date.getFullYear(), date.getMonth(), 0);

    this.dataMinima = dataMinima;
    this.dataMaxima = dataMaxima;


    this.dataInicio = this.dataMinima.toLocaleDateString();
    this.dataFim = this.dataMaxima.toLocaleDateString();

  }

  ngOnInit(): void {
    this.setFormPagar();
  }

  private setFormPagar() {
    this.pagForm = this.formBuilderPag.group({
      idPag: [null, Validators.required],
      inicioRelB: [null, Validators.required],
      fimRelB: [null, Validators.required]

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

  buscarPagamento() {
    this.pagamentoService.listPagamento().subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        console.log(this.pagamento);
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

}
