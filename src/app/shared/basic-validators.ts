
import * as moment from 'moment';
import { ValidatorFn, AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class BasicValidators {

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value.length > max) {
        return {
          invalid: `O tamanho máximo deste campo deve ser ${max} caracteres.`
        };
      }
      return null;
    };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value.length < min) {
        return {
          invalid: `O tamanho mínimo deste campo deve ser ${min} caracteres.`
        };
      }
      return null;
    };
  }

  static maxValue(max: number, isReal?: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value > max) {
        return {
          invalid: this.tratarMensagem(isReal, max, 'máximo')
        };
      }
      return null;
    };
  }
  static tratarMensagem(isReal: boolean | undefined, max: number, arg2: string): any {
    throw new Error("Method not implemented.");
  }

  /**
   *
   * @param isReal : informa para ver se o valor é real ou apenas númerico
   * @param max: valor máximo a ser apresentado na mensagem
   * @param minimoOuMaximo: informar qual nome aparecerá na mensagem 'mínimo' ou 'máximo'
   */


  static digits(integer: number, fraction: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valorMaximo = Math.pow(10, integer) - 0.01;
      if (control.value > valorMaximo) {
        return {
          invalid: `Valor maior do que ${valorMaximo
            .toString()
            .replace('.', ',')}.`
        };
      }
      const regexCasasFracionarias = `^\\d+(?:\\.\\d{1,${fraction}})?$`;
      const parteFracionariaIncorreta = !new RegExp(
        regexCasasFracionarias
      ).test(control.value);
      if (parteFracionariaIncorreta) {
        return {
          invalid: `Valor inválido. Ex: ${new Array(integer + 1).join(
            '#'
          )},${new Array(fraction + 1).join('#')}`
        };
      }
      return null;
    };
  }

  static minValue(min: number, isReal?: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      if (control.value < min) {
        return {
          invalid: this.tratarMensagem(isReal, min, 'mínimo')
        };
      }
      return null;
    };
  }

  static email(control: FormControl): any {
    if (!control.value) {
      return { required: true };
    }
    // tslint:disable-next-line:max-line-length
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regEx.test(control.value.trim());
    return valid ? null : { invalid: 'Email inválido' };
  }

  static password(control: FormControl): any {
    if (!control.value) {
      return { invalid: 'Senha obrigatória' };
    }
    if (control.value.length === 0) {
      return { invalid: 'Senha obrigatória' };
    }
    if (control.value.length < 2) {
      return { invalid: 'A sua senha deve ter mais de 8 caracteres.' };
    }
    return null;
  }


  static date(control: FormControl): any {
    const date = control.value;
    if (!date) {
      return null;
    }
    if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
      return { invalid: 'Data inválida - Formato:  dd/mm/aaaa.' };
    }
    return null;
  }

  static datetime(control: FormControl): any {
    const date = control.value;
    if (!date) {
      return null;
    }
    if (!moment(date, 'DD/MM/YYYY HH:mm', true).isValid()) {
      return { invalid: 'Data inválida - Formato:  DD/MM/AAAA HH:mm.' };
    }
    return null;
  }

  static obrigatorio(msg?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      msg = msg ? msg : 'Campo obrigatório.';
      if (control.value == null) {
        return { invalid: msg };
      }
      if (control.value.length === 0) {
        return { invalid: msg };
      }
      return null;
    };
  }

  static required(control: FormControl): any {
    if (control.value == null) {
      return { invalid: 'Campo obrigatório.' };
    }
    if (control.value.length === 0) {
      return { invalid: 'Campo obrigatório.' };
    }
    return null;
  }

  static cpf(control?: FormControl): any {
    /*var Soma;
    var Resto;
    Soma = 0;
    const strCPF = control.value.replace(/[^0-9a-z]/gi, '');

    if (strCPF == "00000000000") return {invalid: 'CPF inválido'};

    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return {invalid: 'CPF inválido'};

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return {invalid: 'CPF inválido'};
    return null;*/

    if (!control?.value) {
      return null;
    }
    let sum = 0;
    let remainder: number;
    const cpf = control.value.replace(/[^0-9a-z]/gi, '');
    if (cpf === '00000000000') {
      return { invalid: 'CPF inválido' };
    }
    if (cpf.length < 11) {
      return { invalid: 'CPF inválido' };
    }

    for (let i = 1; i <= 9; i++) {
      // tslint:disable-next-line:radix
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== +cpf.substring(9, 10)) {
      return { invalidCPF: 'CPF inválido' };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + +cpf.substring(i - 1, i) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== +cpf.substring(10, 11)) {
      return { invalid: 'CPF inválido' };
    }
    return null;
  }

  static cnpj(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const cnpj = control.value.replace(/[^0-9a-z]/gi, '');
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
      return { invalid: 'CNPJ inválido' };
    for (i = 0; i < cnpj.length - 1; i++)
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return { invalid: 'CNPJ inválido' };
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) {
        return { invalid: 'CNPJ inválido' };
      }
      return true;
    }
    // else
    //   return {invalid: 'CNPJ inválido'};
    return null;
  }

  static cep(control: FormControl): any {
    if (!control.value) {
      return { required: true };
    }
    const cep = control.value.replace(/[^0-9]/gi, '');
    if (cep.length === 0) {
      return { required: true };
    }
    if (cep.length !== 8) {
      return { invalid: 'CEP inválido.' };
    }
    return null;
  }

  static numeric(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const isNum = /^[0-9.]+$/.test(control.value);
    if (!isNum) {
      return { invalid: 'Campo numérico.' };
    }
    return null;
  }

  static integer(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const isNum = /^[0-9]+$/.test(control.value);
    if (!isNum) {
      return { invalid: 'Campo inteiro.' };
    }
    return null;
  }

  static porcentagem(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    if (+control.value < 0) {
      return { invalid: 'Valor Percentual Mínimo 0,00 %' };
    }
    if (+control.value > 100) {
      return { invalid: 'Valor Percentual Máximo 100,00 %' };
    }
    const temNoMaxDuasCasasDecimais = /^\d+(?:\.\d{1,2})?$/.test(control.value);
    if (!temNoMaxDuasCasasDecimais) {
      return { invalid: 'Valor inválido. Ex: ###,##' };
    }
    return null;
  }

  static porcentagemApenasValor(value:any) {
    if (!value) {
      return null;
    }
    if (value < 0) {
      return { invalid: 'Valor Percentual Mínimo 0,00 %' };
    }
    if (value > 100) {
      return { invalid: 'Valor Percentual Máximo 100,00 %' };
    }
    const temNoMaxDuasCasasDecimais = /^\d+(?:\.\d{1,2})?$/.test(value);
    if (!temNoMaxDuasCasasDecimais) {
      return { invalid: 'Valor inválido. Ex: ###,##' };
    }
    return null;
  }

  static telefone(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const telefone = control.value.replace(/[^0-9]/gi, '');
    if (telefone.length !== 10) {
      return { invalid: 'Telefone Inválido' };
    }
    return null;
  }

  static celular(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const celular = control.value.replace(/[^0-9]/gi, '');
    if (celular.length !== 11 && celular.length !== 10) {
      return { invalid: 'Celular Inválido' };
    }
    return null;
  }

  static ano(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    let ano = control.value + '';
    ano = ano.replace(/[^0-9]/gi, '');
    if (ano.length !== 4) {
      return { invalid: 'Ano inválido' };
    }
    return null;
  }

  static atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup
  ): ValidationErrors | null => {
    const hasAtLeastOne =
      group &&
      group.controls &&
      Object.keys(group.controls).some(k => !validator(group.controls[k]));

    return hasAtLeastOne
      ? null
      : {
        atLeastOne: true
      };
  }


  private static tratarMaiorOuIgual(maiorOuIgual: any, dataInicio: any, dataFim: any) {
    if (maiorOuIgual) {
      return dataInicio.isSameOrAfter(moment(dataFim, 'DD/MM/YYYY'));
    } else {
      return dataInicio.isAfter(moment(dataFim, 'DD/MM/YYYY'));
    }
  }

  /**
   * 1 - data de Inicio invalida;
   * 2 - data fim invalida;
   * @param tipoCampo
   */
  private static handlerRetornoErro(tipoCampo: any, mensagem: any) {
    let retorno;
    switch (tipoCampo) {
      case 1:
        retorno = {
          dataInicioInvalida: mensagem
        };
        break;
      case 2:
        retorno = {
          dataFimInvalida: mensagem
        };
        break;
      default:
        retorno = null;
        break;
    }
    return retorno;
  }
}
