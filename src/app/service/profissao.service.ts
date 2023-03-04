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

  }
