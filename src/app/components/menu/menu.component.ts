import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  items: MenuItem[];
  usuarioLogado: String = '';
  letraAvatar: String;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    public router: Router
  ) {
    this.buscaUsuarioEmail();
    this.items = this.menuItems();
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  buscaUsuarioEmail() {
    this.usuarioService
      .buscarUsuarioEmail(this.tokenService.getUserName())
      .subscribe(
        (data) => {
          this.setUsuarioMenuEAvatar(data['nome']);
        },
        (error) => {
          this.setUsuarioMenuEAvatar('usuário');
        }
      );
  }

  private setUsuarioMenuEAvatar(nome: String) {
    const primeiroNomeUsuario = nome.split(' ')[0];
    const primeiraLetraMariuscula = primeiroNomeUsuario.charAt(0).toUpperCase();
    const outrasLetrasMinusculas = primeiroNomeUsuario.slice(1);

    this.usuarioLogado = `${primeiraLetraMariuscula}${outrasLetrasMinusculas}`;
    this.letraAvatar = this.usuarioLogado.charAt(0).toUpperCase();
  }

  isAdmin() {
    let isAdmin = false;
    this.tokenService.getAuthorities().split(',').forEach(r => {
      if(r === 'ROLE_ADMIN') {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  private menuItems() {
    return [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        visible: this.isAdmin(),
        label: 'Cadastro',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Usuário',
            icon: 'pi pi-user',
            routerLink: '/usuario',
          },
          {
            label: 'Colaborador',
            icon: 'pi pi-briefcase',
          },
        ],
      },
      {
        label: 'Pagamentos',
        icon: 'pi pi-money-bill',
      },
      {
        visible: true,
        label: 'Relatórios',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Colaborador pagar',
            icon: 'pi pi-print',
            routerLink: '/lista-colaborador-total-pagar',
          },
        ],
      },
    ];
  }
}
