import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfissaoService {

  constructor(
    private http: HttpClient
  ) {

  }
  private url = `${environment.url}rh-pagamento/profissao`

   listProfissao(){
     return this.http.get(this.url);

  }
  editarSituacao(id: number, situacao: string) {
    return this.http.patch(`${this.url}/id/${id}/situacao/${situacao}`,null);
  }
  salvarProfissao(profissao: any) {
    return this.http.post(this.url, profissao);
  }
  listProfissaoIdPro(id: number){
    return this.http.get(`${this.url}/${id}`);

  }

  }
