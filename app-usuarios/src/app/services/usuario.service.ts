import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario'; // ** Ruta absoluta **
// *** Debemos de usar las variables de ambiente de desarrollo ***
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /** URL Base */
  private baseUrl: string = environment.baseUrl;

  // listaUsuarios: Usuario[] = [];

  listaUsuarios: Usuario[] = [
    { uid: 1001
      , usuario: "jperez"
      , nombre: 'Juan'
      , apellido: "Pérez"
      , edad: 27
      , sexo: 'M'
      , descripcion: 'Analista'
      , esadministrador: true
      , nacionalidad: 'C'
      , fechanacimiento: '1995-03-01T05:00:00.000Z'
      , aficiones: ['Tecnologias', 'Deporte'] 
    },
    { uid: 1002
      , usuario: "mramirez"
      , nombre: 'Monica'
      , apellido: "Ramirez"
      , edad: 27
      , sexo: 'F'
      , descripcion: 'Analista'
      , esadministrador: false
      , nacionalidad: 'E'
      , fechanacimiento: '1995-08-06T05:00:00.000Z'
      , aficiones: ['Investigación', 'Lectura'] 
    },
    { uid: 1003
      , usuario: "ftorres"
      , nombre: 'Fabian'
      , apellido: "Torres"
      , edad: 40
      , sexo: 'M'
      , descripcion: 'Ingeniero'
      , esadministrador: true
      , nacionalidad: 'C'
      , fechanacimiento: '1981-03-23T05:00:00.000Z'
      , aficiones: ['Investigación'] 
    },
    { uid: 1004
      , usuario: "fceballos"
      , nombre: 'Fernanda'
      , apellido: "Ceballos"
      , edad: 32
      , sexo: 'F'
      , descripcion: 'Ingenieria'
      , esadministrador: true
      , nacionalidad: 'C'
      , fechanacimiento: '1990-02-03T05:00:00.000Z'
      , aficiones: ['Tecnologías de la Información'] 
    },
    { uid: 1005
      , usuario: "nanichiarico"
      , nombre: 'Natalia'
      , apellido: "Anichiarico"
      , edad: 32
      , sexo: 'F'
      , descripcion: 'Diseñadora'
      , esadministrador: false
      , nacionalidad: 'E'
      , fechanacimiento: '1990-09-02T05:00:00.000Z'
      , aficiones: ['Diseño Gráfico'] 
    },
    { uid: 1006
      , usuario: "lbautista"
      , nombre: 'Luz'
      , apellido: "Bautista"
      , edad: 27
      , sexo: 'F'
      , descripcion: 'Administradora'
      , esadministrador: false
      , nacionalidad: 'E'
      , fechanacimiento: '1995-12-23T05:00:00.000Z'
      , aficiones: ['Contabilidad'] 
    },
    { uid: 1007
      , usuario: "acalderon"
      , nombre: 'Alejandro'
      , apellido: "Calderon"
      , edad: 27
      , sexo: 'F'
      , descripcion: 'Analista Senior'
      , esadministrador: false
      , nacionalidad: 'C'
      , fechanacimiento: '1995-08-06T05:00:00.000Z'
      , aficiones: ['Bases de Datos'] 
    }
  ];

  constructor( private _http: HttpClient ) { }
  
  /**
   * Un usuario vacio sin información previa
   * @returns Un registro del tipo Usuario
   */
  private getDefaultUser(): Usuario {
    return { uid: 9999
            , usuario: ''
            , nombre: ''
            , apellido: ''
            , edad: 0
            , sexo: ''
            , descripcion: ''
            , esadministrador: false
            , nacionalidad: ''
            , fechanacimiento: ''
            , aficiones: [] 
          };
  }

 /**
  * Método para buscar un usuario por username
  * @param uid El identificador del usuario 
  * @returns Usuario Indica el usuario encontrado
  */
  buscarUsuarioPorUID(uid: number): Usuario {
    let usuario: Usuario = this.getDefaultUser();
    
    for (let item of this.listaUsuarios) {
      if (uid === item.uid) {
        return item;
      }
    }
    return usuario;
  }

 /**
  * Método para buscar un usuario por username
  * @param user 
  * @returns 
  */
  buscarUsuarioPorUserName(username: string) {
    for (let item of this.listaUsuarios) {
      if (username.trim() === item.usuario.trim()) {
        return true;
      }
    }
    return false;
  }


  /** Fake simulator
   *  Generar un nuevo UID
   */
  public getNextUID(): number {
    // return this.listaUsuarios.length
    let maxUID: number = 1001;
    this.listaUsuarios.forEach(item => {
      if (item.uid > maxUID) {
        maxUID = item.uid
      }
    });
    return maxUID + 1;
  }


  /**
   * Método para obtener una lista de usuarios.
   * [Se consume el servicio creado del API REST]
   * @returns Una lista de usuarios de mi Base de Datos
   */
  getUsuarios(): Observable<Usuario[]> {
    console.log(`"EndPoint: ", ${ this.baseUrl }/admin/users/v1`);
    // return [...this.listaUsuarios]; // Retorna una copia exacta del arreglo
    // return this._httpClient.get<Usuario[]>(`${ this.baseUrl }/admin/users/v1`);
    return this._http.get<Usuario[]>(`${ this.baseUrl }/admin/users/v1`);
    // return this._httpClient.get<Usuario[]>(`/admin/users/v1`); 
  }
  
  /**
   * Método para obtener una lista de usuarios en Memoria.
   * @returns Una lista de usuarios cargados en memoria
   */
  getUsuariosEnMemoria() {
    // console.log("users: ", this.listaUsuarios);
    return [...this.listaUsuarios]; // Retorna una copia exacta del arreglo
  }
  
  /*
  /**
   * Método para agregar un nuevo usuario al comienzo de la lista
   * [El usuario se agrega en memoria]
   * @param usuario 
   */
  agregarUsuarioEnMemoria(usuario: Usuario) {
    // console.log("item nuevo: " + usuario)
    this.listaUsuarios.unshift(usuario); // Agregar elemento al comienzo de la lista
    // this.listaUsuarios.push( usuario ); // Agregar elemento al final de la lista
  }
  
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    // console.log('usuario: ' + usuario);
    // this.listaUsuarios.unshift(usuario); // Agregar elemento al comienzo de la lista
    // this.listaUsuarios.push( usuario ); // Agregar elemento al final de la lista
    return this._http.post<Usuario>(`${ this.baseUrl }/admin/users/v1`, usuario);
  }

  /**
   * Método para modificar la información de un Usuario en memoria
   * @param usuario 
   */
  editarUsuarioEnMemoria(user: Usuario) {

    // console.log('username: ', user.uid);
    let indice = 0;
    this.listaUsuarios.forEach((item, indice) => {
      // --------------------------------------------------------------
      // ** Asumimos que el nombre de usuario es único en el sistema **
      // --------------------------------------------------------------
      // console.log( item );
      if (user.uid === item.uid ) {
        // console.log('Usuario a modificar: ', this.listaUsuarios[indice]);
        this.listaUsuarios[indice] = user;
      }
    });
  }

  /**
   * Método para modificar la información de un Usuario en BD
   * @param usuario 
   */
  editarUsuario( user: Usuario ): Observable<Usuario> {
    return this._http.put<Usuario>(`${ this.baseUrl }/admin/users/v1`, user);
  }

  /**
   * Eliminar un usuario por uid en memoria
   * @param uid 
   */
   public eliminarUsuarioEnMemoria(uid: number) {
    // console.log('[Eliminar] :: Tx borrar registro: ', uid);
    let index: number = 0;
    for (let item of this.listaUsuarios) {
      // console.log(item.uid, ' | ', uid);
      if (item.uid === uid) {
        // console.log('Item a eliminar: ', item);
        this.listaUsuarios.splice(index, 1); // Borra 1 solo elemento en la posición indicada.
        break;
      }
      index++;
    }
  }

   /**
   * Eliminar un usuario por uid en BD
   * @param uid 
   */
  eliminarUsuario( id: number ): Observable<{}> {
    return this._http.delete<{}>(`${ this.baseUrl }/admin/users/v1/${ id }`);
  }

}