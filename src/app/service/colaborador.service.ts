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

  private urlCol = `${environment.url}rh-colaborador/usuario`

  private urlPag = `${environment.url}rh-pagamento/pagamento`

  buscarColaboradorEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.urlCol}/busca`, {params});
  }

  listaPagamentoIdCol(id: Number) {
    return this.http.get(`${this.urlPag}/busca/${id}`);
  }
}
