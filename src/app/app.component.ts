import { Component } from '@angular/core';
import { TokenService } from './service/token.service';

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

}
