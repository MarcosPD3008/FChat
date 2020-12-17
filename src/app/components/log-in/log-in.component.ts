import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles: [
  ]
})
export class LogInComponent implements OnInit {

  constructor(public cs:ChatService) { }

  ngOnInit(): void {
  }

  Ingresar(Proveedor: string){
    this.cs.login(Proveedor)

  }

}
