import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/service/auth.service';
import {TokenService} from 'src/app/service/token.service';
import {UsuarioService} from 'src/app/service/usuario.service';
import {ToastrService} from "ngx-toastr";

const ADMIN = 'ROLE_ADMIN';

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
    public router: Router,
    private toast: ToastrService
  ) {
    this.buscaUsuarioEmail();
    this.items = this.menuItems();
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => this.toast.info('Logout efetuado com sucesso!'));
  }

  buscaUsuarioEmail() {
    this.usuarioService
      .buscarUsuarioEmail(this.tokenService.getUserName())
      .subscribe(
        (data) => {
          if (data !== null) {
            this.setUsuarioMenuEAvatar(data['nome']);
          } else {
            this.setUsuarioMenuEAvatar('usuário');
          }
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
      if (r === ADMIN) {
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
            routerLink: '/cadastro/usuario',
          },
          {
            label: 'Profissão',
            icon: 'pi pi-wallet',
            routerLink: '/cadastro/profissao',
          },
        ],
      },
      {
        label: 'Colaborador',
        icon: 'pi pi-briefcase',
      },
      {
        label: 'Pagamento',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Lançamento',
            icon: 'pi pi-calendar-plus',
            routerLink: '/pagamento/lancamento',
          },
          {
            label: 'Relatório',
            icon: 'pi pi-book',
            routerLink: '/pagamento/relatorio',
          },
        ],
      },
    ];
  }
}
