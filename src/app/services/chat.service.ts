import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  chats: Mensaje[] = [];

  usuario: any = {
  };

  constructor(private _angularFirestoreService: AngularFirestore, public _angularFireAuth: AngularFireAuth) {
    _angularFireAuth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    switch (proveedor) {
      case 'twitter':
        this._angularFireAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
        break;
      default:
        this._angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
    }

  }

  logout() {
    this.usuario = {};
    this._angularFireAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this._angularFirestoreService.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));

    return this.itemsCollection.valueChanges()
      .pipe(
        map((mensajes: Mensaje[]) => {
          this.chats = [];

          mensajes.forEach(mensaje => {
            this.chats.unshift(mensaje);
          });

          return this.chats;
        }
      ));
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      UID: this.usuario.uid,
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }

}
