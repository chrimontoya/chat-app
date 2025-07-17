import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {io} from 'socket.io-client';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatInputModule, FormsModule, CommonModule, MatFormFieldModule, MatInput, ReactiveFormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private socket: any;
  mensajes: string[] = [];
  messageInput: FormControl = new FormControl()

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    this.socket.on('mensaje', (data: any) => {
      this.mensajes.push(data);
    });
  }

  get message() {
    return this.messageInput.value;
  }

  set message(value: string) {
    this.messageInput.patchValue(value);
  }

  enviar() {
    if (this.message.trim()) {
      this.socket.emit('mensaje', this.message);
      this.message = '';
    }
  }

}
