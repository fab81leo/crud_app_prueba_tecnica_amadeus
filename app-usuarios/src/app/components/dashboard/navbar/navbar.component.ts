import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu'; // Ruta Absoluta
import { MenuService } from 'src/app/services/menu.service'; // Ruta Absoluta


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /** Creamos una nueva variable de tipo Menu[] y lo inicializamos en vacío */
  menu: Menu[] = [];

  constructor( private _menuService: MenuService ) { }

  /** CICLO DE VIDA: Cuando se inicialice este componente cargamos el menu 
   * a través de un SERVICIO */
  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    // Al retornarnos un Observable, tenemos que suscribirnos
    this._menuService.getMenu().subscribe( data => {
      // console.log( data );
      this.menu = data;
    })
  }

}
