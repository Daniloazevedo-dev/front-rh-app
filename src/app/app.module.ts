import { NgModule, LOCALE_ID } from '@angular/core';
export declare function registerLocaleData(data: any, localeId?: string | any, extraData?: any): void;
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { MenuComponent } from './components/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import { CardModule, } from 'primeng/card';
import {AvatarModule} from 'primeng/avatar';
import {DividerModule} from 'primeng/divider';
import { UsuarioComponent } from './components/usuario/usuario.component';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {
  ListaColaboradorTotalPagarComponent
} from "./components/relatorio/lista-colaborador-total-pagar/lista-colaborador-total-pagar.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsuarioComponent,
    ListaColaboradorTotalPagarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    AvatarModule,
    DividerModule,
    FieldsetModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    CommonModule,
    MultiSelectModule,
    ToastModule,
    PanelModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    HttpClientModule,
    ConfirmDialogModule,
    CalendarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
