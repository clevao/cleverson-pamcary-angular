import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from './pessoa';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

	private readonly API = `${environment.API}pessoa`
	
	constructor(private http: HttpClient) { }

	list(){
		return this.http.get<Pessoa[]>(this.API)
			.pipe(
				tap(console.log)
			)
	}

	create(pessoa){
		return this.http.post(this.API, pessoa).pipe(take(1));
	}

	loadById(id){
		return this.http.get(`${this.API}/${id}`).pipe(take(1));
	}
}
