
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { Incident } from 'src/app/interfaces/incident.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  incident: Incident = {
    title: '',
    description: '',
    user: '',
    severity: '',
    completed: undefined
  };

  showSpinner: boolean = false;
  showModal: boolean = true;
  msg: string = '';

  constructor(
    private IncidentService: IncidentService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loading();
  }
  loading(){
    setTimeout(() => {
      this.showSpinner = true;
    }, 1000);
  }
  async agregar(){
    this.IncidentService.addIncident(this.incident).subscribe(
      res => {
        //console.log(res);
        this.showModal =true;
        this.msg = 'Se ha guardado correctamente';
      },
      err => this.msg = 'Ha ocurrido un error'
      
    );
  }
  cancelar(): void {
    this.router.navigate(['/inicio']);
  }
}
