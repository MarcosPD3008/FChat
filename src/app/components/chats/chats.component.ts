import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: [
  ]
})
export class ChatsComponent implements OnInit {
  Mensaje:string;
  Elemento:HTMLElement
  constructor(public cs:ChatService) {
    cs.CargarMensajes().subscribe( () =>{
      setTimeout(()=>{this.Elemento.scrollTop = this.Elemento.scrollHeight},20)
    })  
  }   
  

  ngOnInit(): void {
    this.Elemento = document.getElementById('app-mensajes'); 
  }

  EnviarMensaje(){
    console.log(this.Mensaje)
    if(this.Mensaje.length == 0)
      return
    else
      this.cs.addMensaje(this.Mensaje)
      .then(() => this.Mensaje = "")
      .catch( (err) => console.error("Error: ", err))
  }

}
