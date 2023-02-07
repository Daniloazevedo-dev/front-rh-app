import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private http: HttpClient) { }

  private url = `${environment.url}usuario`

  listUsuarios() {
    return this.http.get(this.url);
  }

  salvarUsuario(usuario: any) {
    return this.http.post(this.url, usuario);
  }

  deleteUsuario(id: Number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
