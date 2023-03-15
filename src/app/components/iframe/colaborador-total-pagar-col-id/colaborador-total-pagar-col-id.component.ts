import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-colaborador-total-pagar-col-id',
  templateUrl: './colaborador-total-pagar-col-id.component.html',
  styleUrls: ['./colaborador-total-pagar-col-id.component.css']
})
export class ColaboradorTotalPagarColIdComponent implements OnInit {

  @Input() idRelC: string;
  @Input() inicioRelC: string;
  @Input() fimRelC: string;

  constructor(
    private relatorioService: RelatorioService,
    private deviceService: DeviceDetectorService
  ) {

  }

  ngOnInit(): void {
    this.colaboradorTotalPagarColId(this.idRelC, this.inicioRelC, this.fimRelC)
    // console.log(this.idRelC)
  }

  colaboradorTotalPagarColId(idRelC: string, inicioRelC: string, fimRelC: string) {
    this.relatorioService.colaboradorTotalPagarColId(idRelC, inicioRelC, fimRelC).subscribe(data => {

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
