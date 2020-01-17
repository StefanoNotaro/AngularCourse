import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';
  constructor(private _chatService: ChatService) {
    _chatService.cargarMensajes().subscribe();
  }

  ngOnInit() {
  }

  enviarMensaje() {
    if (this.mensaje.length <= 0) {
      return;
    }

    this._chatService.agregarMensaje(this.mensaje)
      .then(() => this.mensaje = '')
      .catch((err) => console.log('Ocurrio un error' + err));
  }

}
