import { Component } from '@angular/core';
import { TokenService } from './service/token.service';

const COLABORADOR = 'ROLE_OPERATOR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-rh-app';

  constructor(private tokenService: TokenService) {}

  mostraMenu() {
    return this.tokenService.getToken() !== null;
  }

  isColaborador() {
    let isColaborador = false;
    if(this.tokenService.getAuthorities() !== null) {
      this.tokenService.getAuthorities().split(',').forEach(r => {
        if (r === COLABORADOR) {
          isColaborador = true;
        }
      });
    }
    return isColaborador;
  }

}
