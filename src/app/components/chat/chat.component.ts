import { Component, OnInit } from '@angular/core';
import { BlipChat } from "blip-chat-widget";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new BlipChat()
        .withAppKey("YOUR-APP-KEY")
        .withButton({ color: "#2CC3D5" })
        .build();
  }

}
