import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from './pessoa';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {

	private readonly API = `${environment.API}pessoa`
	
	constructor(private http: HttpClient) { }

	list(){
		return this.http.get<Pessoa[]>(this.API)
			.pipe(
				delay(2000),
				tap(console.log)
			)
	}
}
