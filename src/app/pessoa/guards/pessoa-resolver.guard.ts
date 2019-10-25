import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PessoaResolverGuard implements Resolve<Pessoa> {
  
  constructor(private service: PessoaService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Pessoa>  {
    if(route.params && route.params['codigo']){
      return this.service.loadById(route.params['codigo']);
    }

    return of({
      codigo: null,
      nome: null,
      cpf: null,
      dataNascimento: null
    });
  }

}
