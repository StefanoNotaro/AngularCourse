import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'images';

  constructor(private _angularFireStore: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const STORAGE_REF = firebase.storage().ref();

    imagenes.forEach(x => {
      x.estaSubiendo = true;
      if (x.progreso < 100) {
        const UPLOAD_TASK: firebase.storage.UploadTask = STORAGE_REF
          .child(`${ this.CARPETA_IMAGENES }/${ x.nombreArchivo }`)
          .put(x.archivo);

        UPLOAD_TASK.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => x.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            (error) => console.error('Error al subir el archivo: ', error)
          );
      }
    });
  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this._angularFireStore
      .collection(`/${ this.CARPETA_IMAGENES }`)
      .add(imagen);
  }
}
