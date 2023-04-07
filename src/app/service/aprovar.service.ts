import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AprovarService {

  constructor(private http: HttpClient) {

  }

  private url = `${environment.API_URL}rh-pagamento`

  editarPagamentoStatus(id: number, status: string) {
    return this.http.put(`${this.url}/pagamento/id/${id}/status/${status}`,null);
  }
}
