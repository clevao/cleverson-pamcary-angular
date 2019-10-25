import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router'; 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css']
})
export class PessoaListaComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', {static: false}) deleteModal;
  
  pessoas$: Observable<Pessoa[]>;
  pessoaSelecionada: Pessoa;  

  constructor(private service: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh(){
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

  onDelete(pessoa){
    this.pessoaSelecionada = pessoa;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.delete(this.pessoaSelecionada.codigo).subscribe(
      success => this.onRefresh(),
      error => console.log(error),
      () => this.deleteModalRef.hide()
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }

  onPesquisaCpf(cpf){
    this.pessoas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        return empty();
      })
    );
  }
}
