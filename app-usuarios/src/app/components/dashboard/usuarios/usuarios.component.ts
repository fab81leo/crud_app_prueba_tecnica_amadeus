import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Usuario } from 'src/app/interfaces/usuario'; // ** Ruta Absoluta **
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'edad', 'acciones'];

  listaUsuarios: Usuario[] = [];

  // dataSource = new MatTableDataSource(this.listaUsuarios);
  dataSource!: MatTableDataSource<Usuario>;
  
  // Le decimos que paginador va tener algun valor [!] => Not null assertion
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Inyectando nuestro servicio */
  constructor( 
      private usuarioService: UsuarioService,
      private _snackBar: MatSnackBar ) { 

        // this.cargarUsuarios();
  }
  
  // ** CICLO DE VIDA: Ejecución de este método despues de que la vista ha sido inicializada**
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ** CICLO DE VIDA: Cuando se incializa el componente, cargamos los usuarios **
  ngOnInit() {
    this.cargarUsuarios()
    this.ngAfterViewInit();
  }

  cargarUsuarios() {
    
    this.listaUsuarios = this.usuarioService.getUsuariosEnMemoria();
    // ** Para que se dispare el Observable necesitamos colocar el .subscribe()
    
    // ** Consumiendo servicio de API REST **
    
    // this.usuarioService.getUsuarios().subscribe( usuarios => { 
    //   // console.log("usuario: " + usuario);

    //   // this.listaUsuarios = usuario;
    //   usuarios.forEach( usuario => {
    //     console.log("user: " + usuario)
    //     this.listaUsuarios.push(usuario);
    //   });
      
    // });
    
    // console.log( this.listaUsuarios );    
    this.dataSource = new MatTableDataSource( this.listaUsuarios );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /**
   * Eliminar un usuario por su UID
   * @param uid 
   */
  eliminarUsuario( uid: number ) {
    // console.log(index);
    
    // this.usuarioService.eliminarUsuario( uid );
    this.usuarioService.eliminarUsuarioEnMemoria( uid );

    // [Para visualizar los nuevos cambios sobre mi lista]
    // ** Volvemos a llamar al método cargarUsuarios() y ngAfterViewInit() ** 
    this.cargarUsuarios();
    this.ngAfterViewInit();

    // ** Mostramos un mensaje informativo **
    this._snackBar.open('El usuario fue eliminado con éxito..', '', {
      duration: 1500, // 1 segundo y medio
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

}