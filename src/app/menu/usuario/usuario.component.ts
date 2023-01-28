import { Component, OnInit } from '@angular/core';
import { FormBase } from 'src/app/shared/FormBase';
import { FormBuilder } from '@angular/forms';
import { BasicValidators } from 'src/app/shared/basic-validators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends FormBase implements OnInit {

  roles: any[];
  role: any;
  msgs: any;

  constructor(
    public formBuilder: FormBuilder
  ) {
    super();
    this.roles = [
      {id: '1',roleName: 'ADMIN'},
      {id: '1',roleName:'COLABORADOR'},
      {id: '1',roleName:'FINANCEIRO'}
     ];
   }

  ngOnInit(): void {
    this.setForm();
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
      console.log(this.form.value)
    }
  }

}
