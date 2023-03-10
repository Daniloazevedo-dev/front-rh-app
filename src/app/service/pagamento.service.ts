import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) {

  }

  private url = `${environment.url}rh-pagamento/pagamento`

  listPagamento() {
    return this.http.get(this.url);
  }

  salvarPagamento(id: Number, pagamento: any) {
    return this.http.post(`${this.url}/${id}`, pagamento)
  }

  buscaPorId(id: Number) {
    return this.http.get(`${this.url}/lancamento/${id}`);
  }

  editarSituacao(id: number, situacao: string) {
    return this.http.patch(`${this.url}/id/${id}/situacao/${situacao}`,null);
  }

  editarPagamento( pagamento: any) {
    return this.http.put(`${this.url}`, pagamento)
  }

}


