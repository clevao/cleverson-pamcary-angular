
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListaComponent } from './pessoa/pessoa-lista/pessoa-lista.component';
import { PessoaFormComponent } from './pessoa/pessoa-form/pessoa-form.component';



const routes: Routes = [
  {path: 'pessoa', component: PessoaListaComponent},
  {path: 'pessoa/add', component: PessoaFormComponent},
  {path: 'pessoa/edit/:codigo', component: PessoaFormComponent},
  { path: '', pathMatch: 'full', redirectTo: 'pessoa' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
