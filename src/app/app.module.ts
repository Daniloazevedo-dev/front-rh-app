import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { MenuComponent } from './menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import { CardModule, } from 'primeng/card';
import {AvatarModule} from 'primeng/avatar';
import {DividerModule} from 'primeng/divider';
import { UsuarioComponent } from './menu/usuario/usuario.component';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsuarioComponent
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
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
