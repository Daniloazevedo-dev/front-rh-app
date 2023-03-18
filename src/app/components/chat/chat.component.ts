import { Component, OnInit } from '@angular/core';
import { BlipChat } from 'blip-chat-widget';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    new BlipChat()
      .withAppKey('ZmVuaXg3OmEzYjUwZDRjLWQyMjktNGMyYy05NjZhLWRhNTM3MWE5NWMwMQ==')
      .withButton({ color: '#2CC3D5', icon: '' })
      .withCustomCommonUrl('https://danilo-azevedo-fezft.chat.blip.ai/')
      .build();
  }
}
