import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentComponent } from './pages/incident/incident.component';
import { AgregarComponent } from './pages/agregar/agregar.component';

const routes: Routes = [
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component: IncidentComponent},
  {path: 'add', component: AgregarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
