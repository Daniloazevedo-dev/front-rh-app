import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBase } from 'src/app/shared/FormBase';
import { FormBuilder } from '@angular/forms';
import { AlertaComponent } from 'src/app/shared/alerta/alerta.component';
import { BasicValidators } from 'src/app/shared/basic-validators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [AlertaComponent, MessageService]
})
export class UsuarioComponent extends FormBase implements OnInit {

  roles: String[];
  msgs: any;

  constructor(
    public formBuilder: FormBuilder,
    protected override alerta: AlertaComponent,
  ) {
    super(alerta);
    this.roles = [
      'ADMIN',
      'COLABORADOR',
      'FINANCEIRO'  ];
   }

  ngOnInit(): void {
    this.setForm();
    this.alerta.showError('Erro');
  }

  private setForm() {
    this.form = this.formBuilder.group({
      nome: ['', BasicValidators.obrigatorio('O nome é obrigatório.')],
      email: [null, BasicValidators.obrigatorio('O email é obrigatório.')],
      senha: [null, BasicValidators.obrigatorio('A senha é obrigatório.')],
      role: [null, BasicValidators.obrigatorio('A role é obrigatório.')]
    });
  }

  salvar() {
    this.validateForm();
    if(this.form.valid) {
      this.alerta.showSuccess('TESTE', 'TESTE')
      console.log('fdsfs')
    }
  }

}
