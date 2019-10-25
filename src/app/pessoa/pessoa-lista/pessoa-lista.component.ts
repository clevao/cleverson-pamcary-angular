import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css']
})
export class PessoaListaComponent implements OnInit {

  pessoas$: Observable<Pessoa[]>;

  constructor(private service: PessoaService) { }

  ngOnInit() {
    //this.service.list().subscribe(dados => this.pessoas = dados);

    this.pessoas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        return empty();
      })
    );
  }

}
