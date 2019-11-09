import { AlertModalService } from './../../shared/alert-modal.service';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

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
    private route: ActivatedRoute,
    private alertService: AlertModalService
  ) {
  }

  ngOnInit() {

    // pega objeto definido no resolver
    const pessoa = this.route.snapshot.data['pessoa'];

    this.form = this.fb.group({
      codigo: [pessoa.codigo],
      nome: [pessoa.nome, [Validators.required, Validators.minLength(3)]],
      cpf: [pessoa.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [pessoa.dataNascimento]
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.valid){

      if(this.form.value.codigo){
        this.service.update(this.form.value).subscribe(
          success => {
            console.log('sucesso');
            this.alertService.showAlertSuccess('Cadastro atualizado com sucesso');
            this.location.back();
          },
          error => {
            console.log(error)
            this.alertService.showAlertDanger('Erro ao atualizar cadastro. Tente novamente mais tarde');
          },
          () => console.log('request completo')
        );
      }else{
        this.service.create(this.form.value).subscribe(
          success => {
            console.log('sucesso');
            this.alertService.showAlertSuccess('Cadastro inserido com sucesso');
            this.location.back();
          },
          error => {
            console.log(error)
            this.alertService.showAlertDanger('Erro ao inserir cadastro. Tente novamente mais tarde');
          },
          () => console.log('request completo')
        );
      }

    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();

  }

  isEditar(){
    return this.form.value.codigo > 0;
  }
}
