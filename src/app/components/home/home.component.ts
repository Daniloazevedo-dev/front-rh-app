import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['/home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';
  isLoadingResults = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoadingResults = true;

  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']).then(_ => console.log('Logout foi feito com sucesso!'));
  }

  frontEnd() {
    window.open('https://github.com/Daniloazevedo-dev/front-rh-app.git');
  }
  backtEnd() {
    window.open('https://github.com/gnetti/JavaPleno.git');
  }


}
