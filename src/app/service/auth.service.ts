import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {TokenService} from './token.service';
import {environment} from "../../environments/environment";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET)
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(
        `Código retornado do back-end ${error.status}, ` +
        `body: ${error.error}`);
    }
    return throwError(
      'Algo ruím aconteceu; por favor, tente novamente mais tarde.');
  }

  private static log(message: string): any {
    console.log(message);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http.post<any>(environment.API_URL + 'rh-oauth/oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          var token = JSON.parse(JSON.stringify(res)).access_token.split('.')[1];
          var cred = JSON.parse(this.b64DecodeUnicode(token));
          this.tokenService.saveToken(res.access_token, cred.user_name, cred.authorities);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  b64DecodeUnicode(str: any) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(environment.API_URL + 'rh-oauth/oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          var token = JSON.parse(JSON.stringify(res)).access_token.split('.')[1];
          var cred = JSON.parse(this.b64DecodeUnicode(token));
          this.tokenService.saveToken(res.access_token, cred.user_name, cred.authorities);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

}
