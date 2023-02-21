import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";


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
    public formBuilder: FormBuilder,
    private toast: ToastrService,
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
      inicio: [null, Validators.required],
      fim: [null, Validators.required]

    });
  }


  printListaColaboradorTotalPagar() {
    this.validateForm();
    if (this.form.valid) {
      this.inicio = this.form.value.inicio.toLocaleDateString()
      this.fim = this.form.value.fim.toLocaleDateString()
      this.listaColaboradorTotalPagar('top')
      this.toast.success('Relatório criado com sucesso!')
      this.form.reset()

    }
  }

}
