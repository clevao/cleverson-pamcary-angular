import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

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
  pesquisaCpf: string;


  constructor(private service: PessoaService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private alertService: AlertModalService
              ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.pessoas$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      })
    );
  }
  onEdit(id) {
    this.router.navigate(['/pessoa/edit', id]);
  }

  onDelete(pessoa) {
    this.pessoaSelecionada = pessoa;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete() {
    this.service.delete(this.pessoaSelecionada.codigo).subscribe(
      success => this.onRefresh(),
      error => console.log(error),
      () => this.deleteModalRef.hide()
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onPesquisaCpf() {
    console.log(this.pesquisaCpf);

    if (this.pesquisaCpf) {
      this.pessoas$ = this.service.listByCpf(this.pesquisaCpf)
      .pipe(
        catchError(error => {
          console.log(error);
          this.handleError();
          return empty();
        })
      );
    } else {
      this.onRefresh();
    }
  }

  /*
  * ESSE MÉTODO O CAMPO DE PESQUISA POR CPF E RECARREGA O FORMULÁRIO
  */
  onLimparPesquisaCpf() {
    this.pesquisaCpf = '';
    this.onRefresh();
  }

  // ESSE MÉTODO VERIFICA SE ESTÁ SENDO REALIZADA UMA PESQUISA POR CPF
  isPesquisaCpf() {
    return this.pesquisaCpf != '' && this.pesquisaCpf != null;
  }

  handleError() {
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = '';*/
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }
}
