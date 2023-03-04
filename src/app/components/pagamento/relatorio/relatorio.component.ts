import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../shared/FormBase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UsuarioService} from "../../../service/usuario.service";


@Component({
  selector: 'app-relatorio',
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
  usuarios: any;
  msgError: any;
  dataMaxima = new Date();
  dataMinima = new Date("12/01/2022");

  listColaborador ;
  selectedColaborador: any;

  buscaColaboradorNome($event: any){
    this.usuarioService.listColaboradorNome($event.query).subscribe(
      (usuarios) => {
        this.listColaborador = usuarios;
        console.log(this.listColaborador);
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
  }

  selectID(value: any){
    console.log(value);
  }

  constructor(
    public formBuilderRelA: FormBuilder,
    public formBuilderRelB: FormBuilder,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
  ) {

    super();
    this.setFormListaColaboradorTotalPagar()
    this.setFormColaboradorTotalPagar()
    this.usuarios = this.buscarUsuarios()
    this.dataMaxima.setDate(this.dataMaxima.getDate());
  }


  ngOnInit(): void {

  }

  buscarUsuarios() {
    this.usuarioService.listColaborador().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        console.log(this.usuarios);
      },
      (error) => {
        this.msgError = [
          {severity: 'error', summary: 'Erro', detail: error.error.message},
        ];
      }
    );
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
