import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  // ** Configurar el sistema de rutas hijas **
  // [Entrada principal /dashboard] + rutas hijas
  { path: '', component: DashboardComponent, children: [
    // { path: '', component: InicioComponent },
    { path: '', component: UsuariosComponent },
    { path: 'tablero', component: InicioComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'editar-usuario/:uid', component: CrearUsuarioComponent },
    { path: '**', redirectTo: '' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
