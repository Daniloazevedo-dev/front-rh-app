import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
  providers: [MessageService]
})
export class AlertaComponent {

  constructor(public messageService: MessageService) { }

  public msgs!: MessageService;
  public space = '';

  showSuccess(summary: string, detail: string = this.space) {
    const severity = 'success';
    const key = 'success';
    this.showMessage(key, severity, summary, detail);
  }
  showInfo(summary: string, detail: string = this.space) {
    const severity = 'info';
    const key = 'info';
    this.showMessage(key, severity, summary, detail);
  }
  showWarn(summary: string, detail: string = this.space) {
    const severity = 'warn';
    const key = 'warn';
    this.showMessage(key, severity, summary, detail);
  }
  showError(summary: string, detail: string = this.space) {
    const severity = 'error';
    const key = 'error';
    this.showMessage(key, severity, summary, detail);
  }

  showErrors(tituloErro: any, erros: any[]) {
    const severity = 'error';
    const key = 'error';
    if (erros.length > 0) {
      erros.forEach(erro => {
        this.showMultipleMessage(severity, tituloErro, erro.mensagem);
      });
    } else {
      this.showMessage(key, severity, 'Erro', tituloErro);
    }
  }

  showWarns(tituloErro: any, warns: any[]) {
    const key = 'warn';
    if (warns.length > 0) {
      warns.forEach(warn => {
        this.showMultipleMessage('warn', tituloErro, warn.mensagem);
      });
    } else {
      this.showMessage(key, 'warn', 'Alerta', 'Alguma informação está incorreta.');
    }
  }

  private showMessage(key: string, severity: string, summary: string, detail: string) {
   this.messageService.add({key: key , severity: severity, summary: summary, detail: detail });
  }

  private showMultipleMessage(severity: string, summary: string, detail: string) {
   this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  showGeneric(severity: string, summary: string, detail: string = this.space) {
    const key = 'info';
    this.showMessage(key, severity, summary, detail);
  }

}
