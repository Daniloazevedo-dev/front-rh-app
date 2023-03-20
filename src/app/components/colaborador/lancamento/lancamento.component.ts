import {Component, OnInit} from '@angular/core';
import {ColaboradorService} from "../../../service/colaborador.service";
import {TokenService} from "../../../service/token.service";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoColComponent implements OnInit {

  pagamento: any;
  msgError: any
  coloborador: String;

  constructor(
    private colaboradorService: ColaboradorService,
    private tokenService: TokenService,
  ) {

    // super();
    this.buscaUsuarioLogadoPOrEmail();

  }

  ngOnInit(): void {
  }


  buscaUsuarioLogadoPOrEmail() {
    this.colaboradorService
      .buscarColaboradorEmail(this.tokenService.getUserName())
      .subscribe(
        (data) => {
          this.coloborador = (data['colaborador']);
          if (this.coloborador != '0') {
            this.buscaPagamentoIdCol(data['id'])

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

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }
}
