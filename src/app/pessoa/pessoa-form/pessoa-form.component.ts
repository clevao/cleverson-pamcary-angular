import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  form: FormGroup;

  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private service: PessoaService,
    private location: Location  
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [null]
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){
      this.service.create(this.form.value).subscribe(
        success => {
          console.log('sucesso');
          this.location.back();
        },
        error => console.log(error),
        () => console.log('request completo')
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    
  }

}
