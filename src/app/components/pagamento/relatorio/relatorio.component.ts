import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-lista-colaborador-total-pagar',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent extends FormBase implements OnInit {

  relAForm: FormGroup;
  relBForm: FormGroup;
  displayPosition: boolean;
  position: string;
  inicioRelA: string;
  fimRelA: string;
  inicioRelB: string;
  fimRelB: string;
  idRelB: string;


  constructor(
    public formBuilderRelA: FormBuilder,
    public formBuilderRelB: FormBuilder,
    private toast: ToastrService,
  ) {

    super();
    this.setFormListaColaboradorTotalPagar()

      this.setFormColaboradorTotalPagar();
  }


  ngOnInit(): void {

  }


  listaColaboradorTotalPagar(position: string) {
    this.position = position;
    this.displayPosition = true;


  }

  colaboradorTotalPagar(position: string) {
    this.position = position;
    this.displayPosition = true;


  }


  private setFormListaColaboradorTotalPagar() {
    this.relAForm = this.formBuilderRelA.group({
      inicioRelA: [null, Validators.required],
      fimRelA: [null, Validators.required]

    });
  }

  private setFormColaboradorTotalPagar() {
    this.relBForm = this.formBuilderRelB.group({
      idRelB: [null, Validators.required],
      inicioRelB: [null, Validators.required],
      fimRelB: [null, Validators.required]

    });
  }


  printListaColaboradorTotalPagar() {
    if (this.relAForm.valid) {
      this.inicioRelA = this.relAForm.value.inicioRelA.toLocaleDateString()
      this.fimRelA = this.relAForm.value.fimRelA.toLocaleDateString()
      this.listaColaboradorTotalPagar('top')
      this.toast.success('Relatório gerado com sucesso!')
      this.relAForm.reset()

    }
  }

  printColaboradorTotalPagar() {
    if (this.relBForm.valid) {
      this.idRelB = this.relBForm.value.idRelB
      this.inicioRelB = this.relBForm.value.inicioRelB.toLocaleDateString()
      this.fimRelB = this.relBForm.value.fimRelB.toLocaleDateString()
      this.colaboradorTotalPagar('top')
      this.toast.success('Relatório gerado com sucesso!')
      this.relBForm.reset()


    }
  }
  refresh(): void {
    window.location.reload();
  }

}