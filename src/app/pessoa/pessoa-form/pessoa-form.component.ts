import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Telefone } from './../../telefone/telefone';
import { AlertModalService } from './../../shared/alert-modal.service';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  telefones: Telefone[];
  telefoneSelecionado: Telefone;
  public maskCpf = [ /[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  editTelModalRef: BsModalRef;
  @ViewChild('editTelefoneModal', {static: false}) editTelefoneModal;
  @ViewChild('deleteTelefoneModal', {static: false}) deleteTelefoneModal;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: PessoaService,
    private location: Location ,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit() {

    // pega objeto definido no resolver
    const pessoa = this.route.snapshot.data.pessoa;
    this.telefones = pessoa.telefones;
    console.log(this.telefones);


    this.form = this.fb.group({
      codigo: [pessoa.codigo],
      nome: [pessoa.nome, [Validators.required, Validators.minLength(3)]],
      cpf: [pessoa.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      dataNascimento: [pessoa.dataNascimento]
    });
  }

  onAddTelefone(novoTelefone) {

    if ( novoTelefone.value !== '') {
      const feed = {telefone: novoTelefone.value, codigo: null};
      this.telefones.push(feed);
    }
    novoTelefone.value = '';
  }

  onSubmit() {
    this.submitted = true;
    this.form.value.telefones = this.telefones;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value.telefones);
      if (this.form.value.codigo) {
        this.service.update(this.form.value).subscribe(
          success => {
            console.log('sucesso');
            this.alertService.showAlertSuccess('Cadastro atualizado com sucesso');
            this.location.back();
          },
          error => {
            console.log(error);
            this.alertService.showAlertDanger('Erro ao atualizar cadastro. Tente novamente mais tarde');
          },
          () => console.log('request completo')
        );
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            console.log('sucesso');
            this.alertService.showAlertSuccess('Cadastro inserido com sucesso');
            this.location.back();
          },
          error => {
            console.log(error);
            this.alertService.showAlertDanger('Erro ao inserir cadastro. Tente novamente mais tarde');
          },
          () => console.log('request completo')
        );
      }

    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();

  }

  onRemoveTelefone(telefone) {
    this.telefoneSelecionado = telefone;
    this.editTelModalRef = this.modalService.show(this.deleteTelefoneModal);
  }

  onConfirmDeleteTelefone() {
    const indexTel = this.getTelefoneIndex(this.telefoneSelecionado.telefone);

    if (indexTel > -1) {
      this.telefones.splice(indexTel, 1);
    }
    this.editTelModalRef.hide();
  }

  onDeclineDeleteTelefone() {
    this.editTelModalRef.hide();
  }

  onEditTelefone(telefone){
    this.telefoneSelecionado = telefone;
    this.editTelModalRef = this.modalService.show(this.editTelefoneModal);
  }

  onSaveTelefone(novoTelefone) {
    if( novoTelefone.value !== ''){
      this.telefoneSelecionado.telefone = novoTelefone.value;
      this.editTelModalRef.hide();
    }
  }

  isEditar() {
    return this.form.value.codigo > 0;
  }

  getTelefoneIndex(telefone) {
    let index;
    for (index = 0; index < this.telefones.length; index++) {
      const value = this.telefones[index] as Telefone;
      if (value.telefone === telefone) {
        console.log(' Achou: ' + value.telefone + '(' + index + ')' );
        return index;
      }
    }
  }
}
