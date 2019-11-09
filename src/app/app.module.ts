import { SharedModule } from './shared/shared.module';

import { PessoaModule } from './pessoa/pessoa.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PessoaListaComponent } from './pessoa/pessoa-lista/pessoa-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaListaComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    PessoaModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
