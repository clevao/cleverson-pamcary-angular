import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


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
    private location: Location ,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) =>{
        
        const id = params['codigo'];
        const pessoa$ = this.service.loadById(params['codigo']);
        
        pessoa$.subscribe(pessoa => {
          this.updateForm(pessoa);
        })
      } 
    );

    this.form = this.fb.group({
      codigo: [null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [null]
    });
  }

  updateForm(pessoa){
    this.form.patchValue({
      codigo : pessoa.codigo,
      nome : pessoa.nome,
      cpf : pessoa.cpf,
      dataNascimento : pessoa.dataNascimento
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
