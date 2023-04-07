import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) {
  }

  private urlPag = `${environment.API_URL}rh-pagamento/relatorio`
  private urlCol = `${environment.API_URL}rh-colaborador/relatorio`


  listaColaboradorTotalPagar(inicio: string, fim: string) {
    const params = new HttpParams().set('inicio', inicio);
    return this.http.get(`${this.urlPag}/lista-colaborador-total-pagar?inicio=${inicio}&fim=${fim}`, {responseType: 'blob'});

  }

  colaboradorTotalPagar(id: string,inicio: string, fim: string) {
    const params = new HttpParams().set('inicio', inicio);
    return this.http.get(`${this.urlPag}/colaborador-total-pagar?id=${id}&inicio=${inicio}&fim=${fim}`, {responseType: 'blob'});

  }
  colaboradorTotalPagarColId(id: string,inicio: string, fim: string) {
    const params = new HttpParams().set('inicio', inicio);
    return this.http.get(`${this.urlCol}/colaborador-total-pagar?id=${id}&inicio=${inicio}&fim=${fim}`, {responseType: 'blob'});

  }

}
