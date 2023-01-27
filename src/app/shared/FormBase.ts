import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { BasicValidators } from "./basic-validators";
import { Message, PrimeNGConfig } from 'primeng/api';
import { AlertaComponent } from "./alerta/alerta.component";



export class FormBase {

  public form!: FormGroup;
  estados: any[];
  pt: any;
  error: Message[] = [];


  constructor(protected alerta: AlertaComponent) {

     this.pt = {
      firstDayOfWeek: 0,
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      today: 'Hoje',
      clear: 'Limpar'
    };



    this.estados = [
      { label: 'Acre', value: 'AC' }, { label: 'Amazonas', value: 'AM' }, { label: 'Amapa', value: 'AP' },
      { label: 'Pará', value: 'PA' }, { label: 'Roraima', value: 'RR' }, { label: 'Rondonia', value: 'RO' },
      { label: 'Tocantins', value: 'TO' }, { label: 'Rio Grande do Sul', value: 'RS' }, { label: 'Santa Catarina', value: 'SC' },
      { label: 'Paraná', value: 'PR' }, { label: 'São Paulo', value: 'SP' }, { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Minas Gerais', value: 'MG' }, { label: 'Espirito Santo', value: 'ES' }, { label: 'Goiás', value: 'GO' },
      { label: 'Mato Grosso do Sul', value: 'MS' }, { label: 'Mato Grosso', value: 'MT' }, { label: 'Distrito Federal', value: 'DF' },
      { label: 'Bahia', value: 'BA' }, { label: 'Sergipe', value: 'SE' }, { label: 'Alagoas', value: 'AL' },
      { label: 'Paraíba', value: 'PB' }, { label: 'Piauí', value: 'PI' }, { label: 'Pernambuco', value: 'PE' },
      { label: 'Rio Grande do Norte', value: 'RN' }, { label: 'Maranhão', value: 'MA' }, { label: 'Ceará', value: 'CE' }];
  }

  public getErrors(name: string, form?: FormGroup) {
    if (!form) {
      form = this.form;
    }
    const formControl = form.get(name);
    if (!formControl) {
      return null;
    }
    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      return formControl.errors?.['invalid']
        ? formControl.errors["invalid"]
        : 'Campo obrigatório.';
    }
    return null;
  }

  protected desabilitarCampo(controlName: string, value?: any) {
    const control = this.form.get(controlName);
    control?.disable();
  }

  habilitarCampo(controlName: string, value?: any) {
    const control = this.form.get(controlName);
    if (control?.disabled) {
      control.enable();
    }
  }

  protected setCampoObrigatorio(controlName: string, mensagem?: string) {
    const control = this.form.get(controlName);
    control?.setValidators([BasicValidators.obrigatorio(mensagem)]);
    control?.updateValueAndValidity();
  }

  protected setCampoNaoObrigatorio(controlName: string) {
    const control = this.form.get(controlName);
    control?.clearValidators();
    control?.updateValueAndValidity();
  }

  validateForm() {
    this.validateAllFormFields(this.form);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls)
      .forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
  }


  handleErrorAlert(error: any) {
    if (error.error.detalhe) {
      this.alerta.showError('Erro Interno', error.error.detalhe);
    } else if (error.error.erros) {
      this.alerta.showError('Erro Interno', (error.error.erros.map((err: { mensagem: any; })=> {
        return `${err.mensagem}`;
      }) + '&nbsp;'));
    } else {
      this.alerta.showGeneric(this.genericAlertSeverity(error.status), this.genericErrorMessage(error.status));
    }
  }

  private genericErrorMessage(status: any) {
    let message;
    switch (status) {
      case 400:
        message = 'Requisição inválida.';
        break;
      case 401:
        message = 'Não autorizado.';
        break;
      case 403:
        message = 'Proibido.';
        break;
      case 404:
        message = 'Dados não encontrados.';
        break;
      case 408:
        message = 'Tempo de requisição esgotou.';
        break;
      case 429:
        message = 'Excesso de requisição.';
        break;
      case 500:
        message = 'Erro interno do servidor.';
        break;
      case 502:
        message = 'Bad Gateway.';
        break;
      case 503:
        message = 'Serviço indisponível.';
        break;
      case 503:
        message = 'Serviço indisponível.';
        break;
      default:
        message = 'Serviço indisponível.';
        break;
    }
    return message;
  }

  private genericAlertSeverity(status: any) {
    let severity = '';
    const severityTypes = {aviso: 'warn', erro: 'error', sucesso: 'success'};
    switch (status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 406:
      case 408:
      case 429:
        severity = severityTypes.erro;
        break;
      case 500:
      case 502:
      case 503:
      case 503:
        severity = severityTypes.erro;
        break;
      default:
        severity = severityTypes.erro;
        break;
    }
    return severity;
  }

  handleError(error: any) {
    if (error.error && error.error.detalhe) {
      this.error = [
        {
          severity: 'error',
          summary: error.error.detalhe
        }
      ];
    } else {
      this.error = [
        {
          severity: 'error',
          summary: 'Serviço indisponível.'
        }
      ];
    }
  }

  handleErrorsAlert(err: any) {
    if (err.error) {
      this.alerta.showErrors(err.error.titulo, err.error.erros);
    }
  }

  protected criarDropdown(itens: any[]) {
    return itens.map(item => {
      return {
        label: item.nome || item.descricao || item.financiador,
        value: item
      };
    });
  }

  protected criarDropdownCodigo(itens: any[]) {
    return itens.map(item => {
      return {
        label: item.nome || item.descricao || item.nomeUsuario,
        value: item.codigo || item.codigoPessoa || item.codigoResponsavel,
      };
    });
  }

  public formatarEmReal(valor: any, formato: any) {
      return `R$ ${this.formatNumber(valor, formato)}`;
  }

  public formatarEmPorcentagem(valor: any, formato: any) {
    return `${this.formatNumber(valor, formato)}%`;
  }

  /**
   * Método responsável por deixar o output no formato pt-Br
   * @param value campo para formatar
   * @param formato number, integer ou percent
   */
  public formatNumber(value: any, formato: any) {
    if (this.valorNumericoNulo(value)) {
      switch (formato) {
        case  'number':
          if (!Number.isNaN(value)) {
            value = new Number(value.toString().replace(',', '.'));
          }
          value = value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
          break;
        case 'integer':
          value = value.toLocaleString('pt-BR');
          break;
        case 'percent':
          value = value.toLocaleString('pt-BR', {style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2});
          break;
      }
    }
    return value;
  }

  public valorNumericoNulo(value: any) {
    return (value !== undefined && value !== null) || value === 0;
  }

  public listIsNotEmpty(lista: any[]) {
    return (lista && lista.length > 0);
  }

  formatarTelefone(ddd: any, numero: any) {
    let telefoneFormatado;
    if(ddd && numero) {
    if (numero.length === 8) {
      telefoneFormatado = '(' + ddd + ') ' + numero.substring(0, 4) + '-' + numero.substring(4, 8);
  } else if (numero.length === 9) {
      telefoneFormatado = '(' + ddd + ') ' + numero.substring(0, 5) + '-' + numero.substring(5, 9);
  }
}
  return telefoneFormatado;
  }

  formataCNPJ(cnpj: any) {
    let stringCnpj: string = cnpj.toString().padStart(14, '0');
    const regEx = (/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/);
    return stringCnpj.replace(regEx, '$1.$2.$3/$4-$5');

  }

}
