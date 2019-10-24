import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PessoaComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PessoaModule { }
