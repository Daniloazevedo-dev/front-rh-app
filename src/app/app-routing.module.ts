import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {
  RelatorioComponent
} from "./components/pagamento/relatorio/relatorio.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {path: 'usuario', canActivate: [AuthGuard], component: UsuarioComponent},
  {path: 'pagamento/relatorio', canActivate: [AuthGuard], component: RelatorioComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'login', component: LoginComponent},
   {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
