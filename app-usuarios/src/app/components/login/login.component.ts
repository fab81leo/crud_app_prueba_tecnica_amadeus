import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showLoading: boolean = false;

  /** Inyección de Dependencias */
  constructor(  
      private fb: FormBuilder, 
      private _snackBar: MatSnackBar, 
      private router: Router ) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Método encargado de validar las credenciales del usuario.
   */
  validarCredenciales() {
    // console.log( this.form );
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    // console.log('usuario: ', usuario);
    // console.log('password: ', password);

    // --------------------------------------------------------------
    // ** Como no tenemos un Backend vamos a hardcodear esta parte **
    // --------------------------------------------------------------

    // ** En escenarios reales hariamos una petición POST hacia un BACKEND y este me devolvería
    // algo y en base a eso mostramos un error o lo redireccionamos

    if (usuario === 'admin' && password === 'admin12345') {
      // redireccionamos al DashBoard
      this.fakeLoading();
    } else {
      // Mostramos un mensaje de Error.
      this.mostrarError();
      // resetear el formulario
      this.form.reset();
    }

  }

  /**
   * Método encargado de mostrar un snackBar cuando ocurre un error
   */
  private mostrarError() {
    this._snackBar.open('Credenciales Inválidas', 'Cerrar', {
      duration: 5000, // 5seg
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

  private fakeLoading() {
    this.showLoading = true;
    setTimeout(() => {
      // TODO: Redireccionar al dashboard [Se deben manejar rutas]
      // this.showLoading = false; // Al cabo de 3seg
      this.router.navigate(['dashboard']);
    }, 3000); // 3seg
  }

}
