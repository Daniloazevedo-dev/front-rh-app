import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfissaoService} from "../../../service/profissao.service";
import {Table} from "primeng/table";
import {ToastrService} from "ngx-toastr";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-profissao',
  templateUrl: './profissao.component.html',
  styleUrls: ['./profissao.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfissaoComponent implements OnInit {
  profissao: any;
  msgError: any;
  edicao: boolean = false;
  botaoLabel: string;
  botaoEstilo: string;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private profissaoService: ProfissaoService,
    private toast: ToastrService,
    private confirmationService: ConfirmationService
  ) {
    this.buscarProfissao();

  }

  ngOnInit(): void {

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  tratarSituacao(situacao: string) {
    if (situacao === 'ATIVO') {
      return 'DESATIVAR';

    } else {
      return 'ATIVAR';
    }

  }

  tratarcorbutao(situacao: string) {
    return situacao === 'ATIVO' ? 'p-button-secondary' : 'p-button-info';
  }

  editarProfissao(id: number, situacao: string) {
    let acao;
    let mensagem;
    if (situacao === 'ATIVO') {
      mensagem = 'Ativado com Sucesso';
      acao = 'ativar';
      situacao = 'INATIVO'

    } else {
      acao = 'desativar';
      mensagem = 'Desativado com Sucesso';
      situacao = 'ATIVO'
    }
    this.confirmationService.confirm({
      message: `Tem certeza que deseja ${acao}?`,
      accept: () => {

        this.profissaoService.editarSituacao(id, situacao).subscribe(profissao => {
          this.buscarProfissao();
          this.toast.success(mensagem);
        })
      }
    });
  }

  buscarProfissao() {
    this.profissaoService.listProfissao().subscribe(
      (profissao) => {
        this.profissao = profissao;

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summer: 'Erro', detail: error.error.message},
        ];
      }
    );
  }


}
