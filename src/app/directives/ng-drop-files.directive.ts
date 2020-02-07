import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);

    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDropElement(event: any) {
    const TRANSFERENCIA = this._getTransferencia(event);

    if (!TRANSFERENCIA) {
      return;
    }

    this._extraerArchivos(TRANSFERENCIA.files);

    this._prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    Object.getOwnPropertyNames(archivosLista).forEach(x => {
      const ARCHIVO_TEMPORAL = archivosLista[x];

      if (this._archivoPuedeSerCargado(ARCHIVO_TEMPORAL)) {
        const NUEVO_ARCHIVO = new FileItem(ARCHIVO_TEMPORAL);

        this.archivos.push(NUEVO_ARCHIVO);
      }
    });
  }

  private _archivoPuedeSerCargado(archivo: File): boolean {
    return (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type));
  }

  private _prevenirDetener(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {
    let inArray = false;

    this.archivos.forEach(x => {
        if (!inArray) {
          inArray = x.nombreArchivo === nombreArchivo;
        }
      });

    return inArray;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : (tipoArchivo.startsWith('image'));
  }
}
