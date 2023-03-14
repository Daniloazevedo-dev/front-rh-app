import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  private url = `${environment.url}rh-usuario/usuario`

  listUsuarios() {
    return this.http.get(this.url);
  }

  salvarUsuario(usuario: any) {
    return this.http.post(this.url, usuario);
  }

  atualizarUsuario(usuario: any) {
    return this.http.put(this.url, usuario);
  }

  deleteUsuario(id: Number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  buscarUsuarioEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.url}/login/email`, {params});
  }

  buscaPorId(id: Number) {
    return this.http.get(`${this.url}/${id}`);
  }

  listColaboradorNome(query: string) {
    return this.http.get(`${this.url}/colaborador/nome/?nome=${query}`);
  }

  listColaborador() {
    return this.http.get(`${this.url}/colaborador`);
  }

}

