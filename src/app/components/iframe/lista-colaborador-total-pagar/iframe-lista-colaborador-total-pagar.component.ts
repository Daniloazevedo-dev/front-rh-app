import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";

@Component({
  selector: 'app-iframe-lista-colaborador-total-pagar',
  templateUrl: './iframe-lista-colaborador-total-pagar.component.html',
  styleUrls: ['./iframe-lista-colaborador-total-pagar.component.css']
})
export class IframeListaColaboradorTotalPagarComponent implements OnInit {

  @Input() inicio: string;
  @Input() fim: string;

  constructor(
    private relatorioService: RelatorioService
  ) {


  }

  ngOnInit(): void {
    this.listaColaboradorTotalPagar(this.inicio, this.fim)
    // console.log(this.inicio)
  }

  listaColaboradorTotalPagar(inicio: string, fim: string) {
    this.relatorioService.listaColaboradorTotalPagar(inicio, fim).subscribe(data => {
      var html = '';
      var blob = new Blob([data], {type: 'application/pdf'})
      var iframe = document.querySelector("iframe");
      console.log(iframe)
      iframe.src = URL.createObjectURL(blob);

    })

  }
}


