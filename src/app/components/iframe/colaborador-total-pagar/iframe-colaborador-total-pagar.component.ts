import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";

@Component({
  selector: 'app-iframe-colaborador-total-pagar',
  templateUrl: './iframe-colaborador-total-pagar.component.html',
  styleUrls: ['./iframe-colaborador-total-pagar.component.css']
})
export class IframeColaboradorTotalPagarComponent implements OnInit {

  @Input() idRelB: string;
  @Input() inicioRelB: string;
  @Input() fimRelB: string;

  constructor(
    private relatorioService: RelatorioService
  ) {

  }

  ngOnInit(): void {

    this.colaboradorTotalPagar(this.idRelB, this.inicioRelB, this.fimRelB)
    // console.log(this.inicio)
  }

  colaboradorTotalPagar(idRelB: string, inicioRelB: string, fimRelB: string) {
    this.relatorioService.colaboradorTotalPagar(idRelB, inicioRelB, fimRelB).subscribe(data => {
      var html = '';
      var blob = new Blob([data], {type: 'application/pdf'})
      var iframe = document.querySelector("iframe");
      console.log(iframe)
      iframe.src = URL.createObjectURL(blob);

    })

  }

}
