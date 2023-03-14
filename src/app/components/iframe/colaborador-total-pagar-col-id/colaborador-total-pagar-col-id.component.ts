import {Component, Input, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";

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
  )
  {

  }

  ngOnInit(): void {
      this.colaboradorTotalPagarColId(this.idRelC, this.inicioRelC, this.fimRelC)
    // console.log(this.idRelC)
  }

  colaboradorTotalPagarColId(idRelC: string, inicioRelC: string, fimRelC: string) {
    this.relatorioService.colaboradorTotalPagarColId(idRelC, inicioRelC, fimRelC).subscribe(data => {
      var html = '';
      var blob = new Blob([data], {type: 'application/pdf'})
      var iframe = document.querySelector("iframe");
      console.log(iframe)
      iframe.src = URL.createObjectURL(blob);

    })

  }

}
