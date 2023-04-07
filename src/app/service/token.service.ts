import {Injectable} from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_NAME = 'user_name';
const AUTHORITIES = 'authorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getToken(): string {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  getUserName(): string {
    return sessionStorage.getItem(USER_NAME);
  }

  getAuthorities(): string {
    return sessionStorage.getItem(AUTHORITIES);
  }

  getRefreshToken(): string {
    return sessionStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token, user_name, authorities): void {
    sessionStorage.setItem(ACCESS_TOKEN, token);
    sessionStorage.setItem(USER_NAME, user_name);
    sessionStorage.setItem(AUTHORITIES, authorities);
    localStorage.removeItem('blipSdkUAccount');
  }

  saveRefreshToken(refreshToken): void {
    sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(AUTHORITIES);
  }

  removeRefreshToken(): void {
    sessionStorage.removeItem(REFRESH_TOKEN);

  }
}
