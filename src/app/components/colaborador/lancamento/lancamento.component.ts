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
  id: any;

  constructor(
    private colaboradorService: ColaboradorService,
    private tokenService: TokenService,
  ) {

    // super();
    this.id = this.buscaUsuarioLogadoPOrEmail();
    this.buscaPagamentoIdCol();

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
            this.id = (data['id']);
            console.log(this.id)
          }
        },
        (error) => {
          error.message('não é colaborador')
        }
      );
  }

  buscaPagamentoIdCol() {
    this.colaboradorService.listaPagamentoIdCol(Number(7)).subscribe(
      (pagamento) => {
        this.pagamento = pagamento;
        console.log(this.id)
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }
}
