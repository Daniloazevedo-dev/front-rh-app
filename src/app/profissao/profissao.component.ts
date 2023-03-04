import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfissaoService} from "../service/profissao.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-profissao',
  templateUrl: './profissao.component.html',
  styleUrls: ['./profissao.component.css']
})
export class ProfissaoComponent implements OnInit {
  profissao: any;
  msgError: any;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private profissaoService: ProfissaoService,
  ) {
       this.profissao = this.buscarProfissao();

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

  buscarProfissao() {
    this.profissaoService.listProfissao().subscribe(
      (profissao) => {
        this.profissao = profissao;
        console.log(this.profissao)

      },
      (error) => {
        this.msgError = [
          {severity: 'error', summer: 'Erro', detail: error.error.message},
        ];
      }
    );
  }
}
