import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css']
})
export class PessoaListaComponent implements OnInit {

  pessoas$: Observable<Pessoa[]>;

  constructor(private service: PessoaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.pessoas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        return empty();
      })
    );
  }

  onEdit(id){
    this.router.navigate(['/pessoa/edit', id]);
  }

}
