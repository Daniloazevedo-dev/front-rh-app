import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

constructor(private http: HttpClient) { }

  private url = environment.API_URL + 'rh-usuario/role'

  listRoles() {
    return this.http.get(this.url);
  }

}
