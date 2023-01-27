import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',]
})
export class MenuComponent {

  items: MenuItem[];
  usuarioLogado: String;
  letraAvatar: String;

  constructor() {
    this.usuarioLogado = 'usuario';
    this.items = this.menuItems();
    this.letraAvatar = this.usuarioLogado[0].toUpperCase()
  }

  private menuItems() {
    return [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        visible: true,
        label: 'Cadastro',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Usuário',
            icon: 'pi pi-user',
            routerLink: '/usuario'
          },
          {
            label: 'Colaborador',
            icon: 'pi pi-briefcase'
          }
        ]
      },
      {
        label: 'Pagamentos',
        icon: 'pi pi-money-bill'
      }
    ];
  }
}
