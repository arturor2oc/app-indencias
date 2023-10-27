
import { Component, DoBootstrap, OnInit } from '@angular/core';
import { Incident } from 'src/app/interfaces/incident.interface';
import { IncidentService } from 'src/app/services/incident.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent implements OnInit {

  //Lista de las incidencias
  ListarIncident!: Incident[];
  //
  incident : Incident={
    _id: '',
    completed: undefined
  }
  //Mostar alerta
  showWarning: boolean = false;
  //Mostar spinner
  showSpinner: boolean = false;

  constructor(
    private IncidentService: IncidentService,
    private router: Router,
    private datePipe: DatePipe) {}

ngOnInit(): void {
  this.loading();
  this.listarIncident();
  this.showWarning = false;
}

//Lista las incidencias
listarIncident() {
   this.IncidentService.getIncidents().subscribe(
    res => {
      this.ListarIncident = <any>res;
      //console.log(res);
    },
    err => console.log(err)
  );

}
//Filtra las incidencias por su estado
async incidentByState(state: string) {
  this.ListarIncident = [];
  this.showWarning = false;
  this.showSpinner = false;
  this.loading();
  this.IncidentService.getIncidentsByState(state).subscribe(
    res => {
      this.ListarIncident = <any>res;
      console.log(res);
      if (this.ListarIncident === null) {
        // Mostrar advertencia
        this.showWarning = true;
      }
    },
    err => console.log('Error: ' + err)
  );
}
//Filtra las incidencias por severidad
async incidentBySeverity(state: string) {
  this.ListarIncident = [];
  this.showWarning = false;
  this.showSpinner = false;
  this.loading();
  this.IncidentService.getIncidentsBySeverity(state).subscribe(
    res => {
      this.ListarIncident = <any>res;
      console.log(res);
      if (this.ListarIncident === null) {
        // Mostrar advertencia
        this.showWarning = true;
      }
    },
    err => console.log(err)
  );
}

async changeState(id: any, completed: any) {
  this.incident._id = id;
  this.incident.completed= !completed;
  
  this.IncidentService.updateIncident(this.incident).subscribe(
    res =>{
      //console.log(res);
      this.listarIncident();
    },
    err=> console.log(err)
  );
}
getId(id: any): any {
 return this.incident._id = id;
}
loading(){
  setTimeout(() => {
    this.showSpinner = true;
  }, 1000);
}
async delete() {
  //console.log(this.incident);
  this.IncidentService.deleteIncident(this.incident).subscribe(
    res=>{
      //console.log(res);
      this.listarIncident();
    },
    err => console.log(err)
  );
}
}
