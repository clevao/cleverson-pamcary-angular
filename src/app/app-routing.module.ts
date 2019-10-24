
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';


const routes: Routes = [
  {path: 'pessoa', component: PessoaListaComponent},
  { path: '', pathMatch: 'full', redirectTo: 'pessoa' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
