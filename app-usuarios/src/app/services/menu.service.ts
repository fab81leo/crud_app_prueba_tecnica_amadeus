import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  /** Realizamos inyección de dependencias de HttpClient */
  constructor( private http: HttpClient) { }

  /** Nuevo métodos */
  
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/menu.json')
  }

}
