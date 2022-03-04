import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Sexo, Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit {

  uid: number = -1;
  mensajeSalida: string = '';
  form: FormGroup;


  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbieCtrl = new FormControl();
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = ['Tecnologías'];
  allHobbies: string[] = ['Lectura', 'Deporte', 'Investigación'];

  @ViewChild('hobbieInput') hobbieInput!: ElementRef<HTMLInputElement>;

  sexo: Sexo[] = [
    { tipo: 'F', nombre: 'Femenino' }, 
    { tipo: 'M', nombre: 'Masculino' }
  ];

  constructor( 
      private fb: FormBuilder, 
      private usuarioService: UsuarioService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute) { 
    
    // -------------------
    // ** Modo Creación **
    // -------------------
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      descripcion: ['', Validators.required],
      esadministrador: [false], // Campo opcional // Fijando valor por defecto 
      nacionalidad: ['C', Validators.required], // Fijando valor por defecto
      fechaNacimiento: ['', Validators.required],
      aficiones: [ this.hobbies ] // Campo opcional      
    });

    this.filteredHobbies = this.hobbieCtrl.valueChanges.pipe(
      startWith(null),
      map((hobbie: string | null) => (hobbie ? this._filter(hobbie) : this.allHobbies.slice())),
    );

    
  }
  ngOnInit(): void {
    // console.log('UID: ', this.getParameterId() );    
    // ** Solo cuando es modo EDICION **
    if( this.getParameterId() !== -1 ) {
      const usuario: Usuario = this.usuarioService.buscarUsuarioPorUID( this.getParameterId() );
      // console.log('usuario', usuario);
      // ** Modo Edición **
      // console.log("AFI: " + usuario.aficiones);
      
      // ** Controlando nuestros hobbies **
      this.hobbies = usuario.aficiones != null ? usuario.aficiones : [];

      this.form = this.fb.group({
        usuario: [ usuario.usuario, Validators.required ],
        nombre: [ usuario.nombre, Validators.required ],
        apellido: [ usuario.apellido, Validators.required ],
        edad: [ usuario.edad, Validators.required ],
        sexo: [ usuario.sexo, Validators.required ],
        descripcion: [ usuario.descripcion, Validators.required],
        esadministrador: [ usuario.esadministrador ], // Campo opcional
        nacionalidad: [ usuario.nacionalidad, Validators.required ],
        fechaNacimiento: [ usuario.fechanacimiento, Validators.required ],
        aficiones: [ usuario.aficiones ], // Campo opcional    
      });
      // ** Deshabilitar campo usuario en modo edición [UNIQUE KEY] ** 
      this.form.get('usuario')?.disable();      
    }
  }

  /**
   * Obtiene el parámetro UID del registro que se va a editar
   * @returns 
   */
  private getParameterId(): number {
    this.activatedRoute.params.subscribe( param => {
        // Importante [casting]
        this.uid = param['uid'] ? Number.parseInt(param['uid']) : this.uid;
    });
    return this.uid;
  }

  /**
   * Genera un UID automaticamente
   * @returns El UID secuencial simulado
   */
  private getUID(): number {
    return this.usuarioService.getNextUID();
  }

  agregarUsuario() {

    // console.log("aficiones:" + this.form.getRawValue()['aficiones'] );
    // console.log("Hobbies: " + this.hobbies);
    // console.log("Aficiones: ", this.aficiones);
   
    // ** Obtener solo valores enable de mi Formulario **
    // const user: Usuario = {
    //   uid: this.getUID(),
    //   usuario: this.form.value.usuario,
    //   nombre: this.form.value.nombre,
    //   apellido: this.form.value.apellido,
    //   sexo: this.form.value.sexo,
    // };

    // ** Obtener valores enable y disabled de mi Formulario **
    const user: Usuario = {
      uid: this.getParameterId() === -1 ? this.getUID() : this.getParameterId(),
      usuario: this.form.getRawValue()['usuario'],
      nombre: this.form.getRawValue()['nombre'],
      apellido: this.form.getRawValue()['apellido'],
      edad: this.form.getRawValue()['edad'],
      sexo: this.form.getRawValue()['sexo'],
      descripcion: this.form.getRawValue()['descripcion'],
      esadministrador: this.form.getRawValue()['esadministrador'],
      nacionalidad: this.form.getRawValue()['nacionalidad'],
      fechanacimiento: this.form.getRawValue()['fechaNacimiento'],
      aficiones: this.form.getRawValue()['aficiones'],
    };

    // console.log(user);

    // console.log('Parametro UID:', this.getParameterId());    
    if (this.getParameterId() === -1) {
      // console.log('Modo Creación');    
      // -----------------------------------------------------
      // ** Aquí podriamos validar que el usuario no exista **
      // -----------------------------------------------------
      const usuarioExiste = this.usuarioService.buscarUsuarioPorUserName( user.usuario );
      // console.log('usuarioExiste: ', usuarioExiste);
      
      if( usuarioExiste ) {
        this.mensajeSalida = 'El usuario ya se encuentra registrado...';
      } else {
        // this.usuarioService.agregarUsuario( user ); 
        this.usuarioService.agregarUsuarioEnMemoria( user );
        this.mensajeSalida = 'El usuario fue agregado con éxito...';
      }
    } else {
      // console.log('Modo Edición');          
      this.form = this.fb.group({
        usuario: [ user.usuario, Validators.required ],
        nombre: [ user.nombre, Validators.required ],
        apellido: [ user.apellido, Validators.required ],
        sexo: [ user.sexo, Validators.required ],
        descripcion: [ user.descripcion, Validators.required ],
        esadministrador: [ user.esadministrador ], // Campo opcional
        nacionalidad: [ user.nacionalidad ],
        fechanacimiento: [ user.fechanacimiento ],
        aficiones: [ user.aficiones ],
      });
      
      // console.log('Editar usuario: ', user.uid);
      // this.usuarioService.editarUsuario( user );
      this.usuarioService.editarUsuarioEnMemoria( user );
      this.mensajeSalida = 'El usuario fue modificado con éxito..';
    }
    
    
    // ** Redireccionar a mi pestaña de usuarios ** 
    this.router.navigate(['/dashboard/usuarios']);

    // ** Mostramos un mensaje informativo **
    this._snackBar.open(this.mensajeSalida, '', {
      duration: 3000, // 3 segundos
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

  // -------------------------------------------
  // ** Componente Aficiones :: mat-chip-list **
  // -------------------------------------------
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our hobbie
    if (value) {
      this.hobbies.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.hobbieCtrl.setValue(null);
  }

  remove(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);
    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbieInput.nativeElement.value = '';
    this.hobbieCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allHobbies.filter(hobbie => hobbie.toLowerCase().includes(filterValue));
  }

}