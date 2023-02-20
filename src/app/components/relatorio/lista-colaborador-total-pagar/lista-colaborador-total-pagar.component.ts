import {Component, OnInit} from '@angular/core';
import {RelatorioService} from "../../../service/relatorio.service";
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder} from "@angular/forms";
import {BasicValidators} from "../../../shared/basic-validators";


@Component({
  selector: 'app-lista-colaborador-total-pagar',
  templateUrl: './lista-colaborador-total-pagar.component.html',
  styleUrls: ['./lista-colaborador-total-pagar.component.css']
})
export class ListaColaboradorTotalPagarComponent extends FormBase implements OnInit {

  displayPosition: boolean;
  position: string;
  inicio: string;
  fim: string;


  constructor(
    private relatorioService: RelatorioService,
    public formBuilder: FormBuilder,
  ) {

    super();
    this.setFormListaColaboradorTotalPagar()
  }


  ngOnInit(): void {
  }

  listaColaboradorTotalPagar(position: string) {
    this.position = position;
    this.displayPosition = true;

  }

  private setFormListaColaboradorTotalPagar() {
    this.form = this.formBuilder.group({
      inicio: ['', BasicValidators.obrigatorio('O data inicial é obrigatória.')],
      fim: ['']

    });
  }

  printListaColaboradorTotalPagar() {
    this.validateForm();
    if (this.form.valid) {
      this.inicio = this.form.value.inicio.toLocaleDateString()
      this.fim = this.form.value.fim.toLocaleDateString()
      this.listaColaboradorTotalPagar('top')
    }
  }

}
