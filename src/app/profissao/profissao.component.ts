import {Component, OnInit} from '@angular/core';
import {ProfissaoService} from "../service/profissao.service";

@Component({
  selector: 'app-profissao',
  templateUrl: './profissao.component.html',
  styleUrls: ['./profissao.component.css']
})
export class ProfissaoComponent implements OnInit {
  profissao: any;
  msgError: any;

  constructor(
    private profissaoService: ProfissaoService,
  ) {
       this.profissao = this.buscarProfissao();

  }

  ngOnInit(): void {

  }

  buscarProfissao() {
    this.profissaoService.listProfissao().subscribe(
      (profissao) => {
        this.profissao = profissao;
        console.log(this.profissao)

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summer: 'Erro', detail: error.error.message},
        ];
      }
    );
  }
}
