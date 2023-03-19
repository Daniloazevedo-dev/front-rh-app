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
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getUserName(): string {
    return localStorage.getItem(USER_NAME);
  }

  getAuthorities(): string {
    return localStorage.getItem(AUTHORITIES);
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token, user_name, authorities): void {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(USER_NAME, user_name);
    localStorage.setItem(AUTHORITIES, authorities);
    localStorage.removeItem('blipSdkUAccount');
  }

  saveRefreshToken(refreshToken): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(AUTHORITIES);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);

  }
}
