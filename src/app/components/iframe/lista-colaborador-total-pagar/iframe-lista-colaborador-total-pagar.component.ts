import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-iframe-lista-colaborador-total-pagar',
  templateUrl: './iframe-lista-colaborador-total-pagar.component.html',
  styleUrls: ['./iframe-lista-colaborador-total-pagar.component.css']
})
export class IframeListaColaboradorTotalPagarComponent implements OnInit {

  @Input() inicioRelA: string;
  @Input() fimRelA: string;

  constructor(
    private relatorioService: RelatorioService,
    private deviceService: DeviceDetectorService
  ) {


  }

  ngOnInit(): void {
    this.listaColaboradorTotalPagar(this.inicioRelA, this.fimRelA)
    
  }

  listaColaboradorTotalPagar(inicioRelA: string, fimRelA: string) {
    this.relatorioService.listaColaboradorTotalPagar(inicioRelA, fimRelA).subscribe(data => {

      var blob = new Blob([data], {type: 'application/pdf'})
      var fileURL = URL.createObjectURL(blob);
      if (this.deviceService.isDesktop()) {
        var iframe = document.querySelector("iframe");
        iframe.src = fileURL;
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        window.open(fileURL);
      }
    })
  }
}


