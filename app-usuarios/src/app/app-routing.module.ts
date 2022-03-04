import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardModule } from './components/dashboard/dashboard.module';

const routes: Routes = [
  // ** Si no se define una ruta me redirecciona a login **
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // ** renderizar el componente LoginComponent
  { path: 'login', component: LoginComponent }, 
  // ** Solo cuando el usuario ingrese a esta ruta, cargamos este modulo [LAZYLOAD] **
  // [Se cargan todos los componentes que estan dentro de este modulo]
  { path: 'dashboard', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then(p => p.DashboardModule) },
  // ** Cualquier otra ruta inválida me redirecciona a login ** 
  // [También se podría implementar una página o componente de error 404]
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
