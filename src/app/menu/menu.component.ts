import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css',]
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  usuarioLogado: String;
  avatar: String;

  constructor() {
    this.usuarioLogado = 'usuario';
    this.items = this.menuItems();
    this.avatar = this.usuarioLogado[0].toUpperCase()    
}

  ngOnInit(): void {
    
  }

  private menuItems() {
    return [
      {      
        visible: true,  
        label: 'Cadastro',
        icon:'pi pi-fw pi-plus',
        items: [
            {
              label:'Usuário',
              icon:'pi pi-user'
          },
          {
              label:'Colaborador',
              icon:'pi pi-briefcase'
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
