import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor
  (private http: HttpClient) {

  }

  private url = `${environment.url}rh-colaborador/usuario`

  buscarColaboradorEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.url}/busca`, {params});
  }
}
