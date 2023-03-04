import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {UsuarioComponent} from './components/usuario/usuario.component';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RelatorioComponent} from "./components/pagamento/relatorio/relatorio.component";
import {LoginComponent} from "./components/login/login.component";
import {LancamentoComponent} from "./components/pagamento/lancamento/lancamento.component";
import {ProfissaoComponent} from "./profissao/profissao.component";


const routes: Routes = [
  {path: 'usuario', canActivate: [AuthGuard], component: UsuarioComponent},
  {path: 'pagamento/relatorio', canActivate: [AuthGuard], component: RelatorioComponent},
  {path: 'pagamento/lancamento', canActivate: [AuthGuard], component: LancamentoComponent},
  {path: 'cadastro/profissao', canActivate: [AuthGuard], component: ProfissaoComponent},
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
