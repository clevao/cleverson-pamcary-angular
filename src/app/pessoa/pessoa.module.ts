import { TelefoneComponent } from './../telefone/telefone.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';



@NgModule({
  declarations: [PessoaComponent, PessoaFormComponent, TelefoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PessoaModule { }
