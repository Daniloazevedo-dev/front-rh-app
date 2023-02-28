import { Component, OnInit } from '@angular/core';
import {PagamentoService} from "../../../service/pagamento.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  pagamento: any;
  msgError: any;


  constructor(
   private pagamentoService: PagamentoService,
   private toast: ToastrService,

    ) {
    // super();
    this.pagamento = this.buscarPagamento();
  }

  ngOnInit(): void {
  }
  buscarPagamento() {
    this.pagamentoService.listPagamento().subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        console.log(this.pagamento)
      },
      (error) => {
        this.msgError = [
          { severity: 'error', summary: 'Erro', detail: error.error.message },
        ];
      }
    );
  }
}
