import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( private _elementRef: ElementRef) {
    console.log('directiva llamada');
    // _elementRef.nativeElement.style.backgroundColor = "yellow";
  }

  @Input('appResaltado') color: string;

  @HostListener( 'mouseenter' ) mouseEntro() {
    this.resaltar( this.color );
  }

  @HostListener( 'mouseleave' ) mouseLeave() {
    this.resaltar();
  }

  private resaltar( color: string = null ) {
    this._elementRef.nativeElement.style.backgroundColor = color;
  }

}
