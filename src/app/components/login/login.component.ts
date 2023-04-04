import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = '';
  password = '';
  isLoadingResults = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.email],
      password: [null, Validators.minLength(3)]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.isLoadingResults = false;
        this.router.navigate(['/home'])
          // .then(_ => this.toast.success('Login efetuado com sucesso!'));
      }, (err: any) => {
        this.toast.error('Usuário e/ou senha inválidos!')
        this.loginForm.reset();
        this.isLoadingResults = false;
      });
  }


}
