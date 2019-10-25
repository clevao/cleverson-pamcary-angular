
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListaComponent } from './pessoa/pessoa-lista/pessoa-lista.component';
import { PessoaFormComponent } from './pessoa/pessoa-form/pessoa-form.component';
import { PessoaResolverGuard } from './pessoa/guards/pessoa-resolver.guard';



const routes: Routes = [
  {path: 'pessoa', component: PessoaListaComponent},
  {
    path: 'pessoa/add', 
    component: PessoaFormComponent, 
    resolve: {pessoa: PessoaResolverGuard}
  },
  {
    path: 'pessoa/edit/:codigo', 
    component: PessoaFormComponent,
    resolve: {pessoa: PessoaResolverGuard}
  },
  { path: '', pathMatch: 'full', redirectTo: 'pessoa' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
