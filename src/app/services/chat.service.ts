import { Mensaje } from './../interfaces/mensaje';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Mensaje[]
  public User:any = {}
  items: Observable<Mensaje[]>;

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {
    this.auth.authState.subscribe(
      user =>{
        if(user){
          this.User.Nombre = user.displayName;
          this.User.uid = user.uid;
        }
      }
    )
  }
  
  login(Proveedor: string) {
    if(Proveedor == "Google")
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    else
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  logout() {
    this.auth.signOut();
    this.User = {}
  }

  addMensaje(text: string) {
    let f = new Date();
    let mensaje:Mensaje = {
      Nombre:this.User.Nombre,
      Mensajes: text,
      uid:this.User.uid,
      Fecha: this.Format(f.getDate()) + "/" + this.Format((f.getMonth()+1)) + "/" + f.getFullYear(),
      Hora: this.Format(f.getHours()) + ":" + this.Format(f.getMinutes()) + ":" + this.Format(f.getSeconds())
    }
    return this.itemsCollection.add(mensaje);
  }

  CargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('Chats', ref => ref.orderBy("Fecha", "desc").orderBy("Hora", "desc")
                                                                   .limit(5));
    return this.itemsCollection.valueChanges()
               .map((Mensajes:Mensaje[]) =>{
      this.chats = Mensajes.reverse()
    });
  }

  Format(value:number | string):string{
    if(value < 10)
      return "0"+value
    else
     return String(value)
  }
}
