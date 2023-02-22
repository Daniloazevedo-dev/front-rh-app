import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";

@Component({
  selector: 'app-iframe-lista-colaborador-total-pagar',
  templateUrl: './iframe-lista-colaborador-total-pagar.component.html',
  styleUrls: ['./iframe-lista-colaborador-total-pagar.component.css']
})
export class IframeListaColaboradorTotalPagarComponent implements OnInit {

  @Input() inicioRelA: string;
  @Input() fimRelA: string;

  constructor(
    private relatorioService: RelatorioService
  ) {


  }

  ngOnInit(): void {
    this.listaColaboradorTotalPagar(this.inicioRelA, this.fimRelA)
    // console.log(this.inicio)
  }

  listaColaboradorTotalPagar(inicioRelA: string, fimRelA: string) {
    this.relatorioService.listaColaboradorTotalPagar(inicioRelA, fimRelA).subscribe(data => {
      var html = '';
      var blob = new Blob([data], {type: 'application/pdf'})
      var iframe = document.querySelector("iframe");
      console.log(iframe)
      iframe.src = URL.createObjectURL(blob);

    })

  }
}


