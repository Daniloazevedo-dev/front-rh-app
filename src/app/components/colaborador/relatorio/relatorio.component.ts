import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../service/token.service";
import {ColaboradorService} from "../../../service/colaborador.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormBase} from "../../../shared/FormBase";
import {ToastrService} from "ngx-toastr";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioColComponent extends FormBase implements OnInit {

  coloborador: String;
  displayPosition: boolean;
  position: string;
  dataMaxima = new Date();
  dataMinima = new Date();
  relCForm: FormGroup;
  inicioRelC: string;
  fimRelC: string;
  idRelC: string;

  constructor(
    private colaboradorService: ColaboradorService,
    private tokenService: TokenService,
    public formBuilderRelC: FormBuilder,
    private toast: ToastrService,
    private deviceService: DeviceDetectorService
  ) {
    super();
    this.buscaUsuarioLogadoPOrEmail();
    this.dataMinima.setDate(this.dataMinima.getDate() - 331);
    this.setFormColaboradorTotalPagarIdCol();
  }

  ngOnInit(): void {

  }

  buscaUsuarioLogadoPOrEmail() {
    this.colaboradorService
      .buscarColaboradorEmail(this.tokenService.getUserName())
      .subscribe(
        (data) => {
          this.coloborador = (data['colaborador']);
          if (this.coloborador != '0') {
            this.idRelC = (data['id']);
          }
        },
        (error) => {
          error.message('não é colaborador')
        }
      );
  }

  colaboradorTotalPagarIdCol(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  private setFormColaboradorTotalPagarIdCol() {
    this.relCForm = this.formBuilderRelC.group({
      idRelC: [this.idRelC],
      inicioRelC: [null, Validators.required],
      fimRelC: [null, Validators.required]

    });
  }

  printColaboradorTotalPagarIdCol() {
    if (this.relCForm.valid) {
      this.idRelC = this.idRelC
      this.inicioRelC = this.relCForm.value.inicioRelC.toLocaleDateString()
      this.fimRelC = this.relCForm.value.fimRelC.toLocaleDateString()
      if (this.deviceService.isDesktop()) {
        this.colaboradorTotalPagarIdCol('top')
      }
      this.toast.success('Relatório gerado com sucesso!')
      this.relCForm.reset()
    }
  }

  refresh(): void {
    window.location.reload();
  }

}
