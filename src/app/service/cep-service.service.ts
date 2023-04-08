import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { error } from 'console';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class CepServiceService {

  constructor(private http : HttpClient) {

   }
  
  buscar(cep : string){
    
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);

    }
  
      }

