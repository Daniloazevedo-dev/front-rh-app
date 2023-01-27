import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicosService } from '@service/core/servicos.service';
import { SharedModule } from '@shared/shared.module';

import { AlertaComponent } from './alerta.component';

describe('AlertaComponent', () => {
  let component: AlertaComponent;
  let fixture: ComponentFixture<AlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [HttpClient, ServicosService, HttpHandler],
      imports: [RouterTestingModule.withRoutes([]), SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve instanciar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o metodo showSuccess, com retorno Undefined', () => {
    const sucess =  component.showSuccess('Testes Sucesso', 'Teste de menssagem ok');
    expect(sucess).toBeUndefined();
  });

  it('Deve testar o metodo showError, com retorno Undefined', () => {
    const sucess =  component.showError('Testes Sucesso', 'Teste de menssagem ok');
    expect(sucess).toBeUndefined();
  });

  it('Deve testar o metodo showInfo, com retorno Undefined', () => {
    const sucess =  component.showInfo('Testes Sucesso', 'Teste de menssagem ok');
    expect(sucess).toBeUndefined();
  });

  it('Deve testar o metodo showWarn, com retorno Undefined', () => {
    const sucess =  component.showWarn('Testes Sucesso', 'Teste de menssagem ok');
    expect(sucess).toBeUndefined();
  });

});
