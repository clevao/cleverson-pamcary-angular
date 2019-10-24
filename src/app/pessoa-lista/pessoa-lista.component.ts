import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa/pessoa.service';
import { Pessoa } from '../pessoa/pessoa';
import { Observable } from 'rxjs';

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

    this.pessoas$ = this.service.list();
  }

}
