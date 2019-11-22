import { TelefoneComponent } from './../telefone/telefone.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [PessoaComponent, PessoaFormComponent, TelefoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
  ]
})
export class PessoaModule { }
