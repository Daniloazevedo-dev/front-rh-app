import { Component, OnInit } from '@angular/core';
import { BlipChat } from 'blip-chat-widget';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  usuario: any;

  constructor(
    private tokentService: TokenService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.buscaUsuarioEmail();
  }

  chamarCharBot(data) {
    localStorage.removeItem('blipSdkUAccount');

    var primeiroAcesso = this.validaPrimeiroAcesso(data.primeiroAcesso);
    var id = data.id;
    var nome = data.nome;
    var token = this.tokentService.getToken();

    var blipClient = new BlipChat();
    blipClient
      .withAppKey(
        'ZmVuaXg3OmEzYjUwZDRjLWQyMjktNGMyYy05NjZhLWRhNTM3MWE5NWMwMQ=='
      )
      .withCustomCommonUrl('https://danilo-azevedo-fezft.chat.blip.ai/')
      .withEventHandler(BlipChat.LOAD_EVENT, function () {
        blipClient.sendMessage({
          type: 'text/plain',
          content: {
            id: id,
            token: token,
            nome: nome,
            primeiroAcesso: primeiroAcesso,
          },
          metadata: {
            '#blip.hiddenMessage': true,
          },
        });
      })
      .build();

    if (primeiroAcesso) {
      blipClient.toogleChat();
    }
  }

  buscaUsuarioEmail() {
    this.usuarioService
      .buscarUsuarioEmail(this.tokentService.getUserName())
      .subscribe((data) => {
        this.chamarCharBot(data);
      });
  }

  validaPrimeiroAcesso(primeiroAcesso) {
    return primeiroAcesso ? primeiroAcesso : false;
  }
}
