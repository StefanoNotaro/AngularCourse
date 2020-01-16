import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AppPage } from '../../../../e2e/src/app.po';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  forma: FormGroup;

  usuario = {
    nombreCompleto: {
      nombre: 'Stefano',
      apellido: 'Notaro'
    },
    correo: 'stefano.notaro@gmail.com',
    // pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({
      nombreCompleto: new FormGroup ({
        nombre: new FormControl(),
        apellido: new FormControl()
      }),
      correo: new FormControl(),
      pasatiempos: new FormArray([ new FormControl( 'Correr', Validators.required ) ]),
      userName: new FormControl( '', [ Validators.required ], [ this.existeUsuario ] ),
      password: new FormControl(),
      passwordConfirmation: new FormControl()
    });

    this.forma.controls.nombreCompleto.get('nombre').setValidators( [ Validators.required, Validators.minLength(5) ] );
    this.forma.controls.nombreCompleto.get('apellido').setValidators( [ Validators.required, this.validacionPersonalizada ] );
    this.forma.controls.correo.setValidators( [ Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-0.-]+\.[a-z]{2,3}$') ] );
    this.forma.controls.password.setValidators( [ Validators.required, this.passwordConfirmation.bind( this.forma ) ] );
    this.forma.controls.passwordConfirmation.setValidators( [ this.passwordConfirmation.bind( this.forma ) ] );

    // this.forma.controls.userName.valueChanges.subscribe( data => console.log(data) );
    this.forma.controls.userName.statusChanges.subscribe( data => console.log(data) ); 

    // this.forma.setValue( this.usuario );
  }

  existeUsuario( control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise( ( resolve, reject ) => {
      setTimeout(() => {
        if ( control.value === 'strider' ) {
          resolve( { existe: true } );
        } else {
          resolve( null );
        }
      }, 3000);
    });

    return promesa;
  }

  guardar() {
    console.log( 'Formulario posteado' );
    console.log( 'NgForm: ', this.forma );
    console.log( 'Valor: ', this.forma.value );
    console.log( 'Controls: ', this.forma.controls );

    if (this.forma.valid) {
      this.forma.reset();
    }
  }

  agregarPasatiempo() {
    (this.forma.controls.pasatiempos as FormArray).push( new FormControl( '', Validators.required ) );
  }

  passwordConfirmation( control: FormControl ): { [s: string]: boolean } {
    const forma: any = this;

    if ( control.value !== forma.controls.password.value ) {
      return {
        passwordConfirmation: false
      };
    }

    return null;
  }

  validacionPersonalizada( control: FormControl ): { [s: string]: boolean } {
    if ( control.value !== null && control.value.toLowerCase() === 'invalid' ) {
      return {
        inValid: true
      };
    }

    return null;
  }

}
