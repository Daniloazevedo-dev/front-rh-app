import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {UsuarioComponent} from './components/cadastros/usuario/usuario.component';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RelatorioComponent} from "./components/movimentos/relatorio/relatorio.component";
import {LoginComponent} from "./components/login/login.component";
import {LancamentoComponent} from "./components/movimentos/lancamento/lancamento.component";
import {ProfissaoComponent} from "./components/cadastros/profissao/profissao.component";
import {RelatorioColComponent} from "./components/colaborador/relatorio/relatorio.component";
import {LancamentoColComponent} from "./components/colaborador/lancamento/lancamento.component";
import {AprovarComponent} from "./components/movimentos/aprovar/aprovar.component";
import {PagamentoComponent} from "./components/movimentos/pagamento/pagamento.component";


const routes: Routes = [
  {path: 'cadastros/usuario', canActivate: [AuthGuard], component: UsuarioComponent},
  {path: 'cadastros/profissao', canActivate: [AuthGuard], component: ProfissaoComponent},
  {path: 'movimentos/relatorio', canActivate: [AuthGuard], component: RelatorioComponent},
  {path: 'movimentos/lancamento', canActivate: [AuthGuard], component: LancamentoComponent},
  {path: 'movimentos/aprovar', canActivate: [AuthGuard], component: AprovarComponent},
  {path: 'movimentos/pagamento', canActivate: [AuthGuard], component: PagamentoComponent},
  {path: 'colaborador/relatorio', canActivate: [AuthGuard], component: RelatorioColComponent},
  {path: 'colaborador/lancamento', canActivate: [AuthGuard], component: LancamentoColComponent},
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
