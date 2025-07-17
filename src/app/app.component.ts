import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private socket: any;
  mensaje = '';
  mensajes: string[] = [];

  ngOnInit() {
    this.socket = io('http://localhost:3000'); // O tu IP/LAN si estás en otro dispositivo

    this.socket.on('mensaje', (data: any) => {
      this.mensajes.push(data);
    });
  }

  enviar() {
    if (this.mensaje.trim()) {
      this.socket.emit('mensaje', this.mensaje);
      this.mensaje = '';
    }
  }

}
