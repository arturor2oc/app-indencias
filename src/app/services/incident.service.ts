import { Incident } from './../interfaces/incident.interface';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  url= 'https://api-incidencias.onrender.com/api/incidents'
  constructor(private http: HttpClient){}

  getIncidents(){
    return this.http.get(this.url+'/get');
  }

  getIncidentsBySeverity(severity: string): Observable<Incident>{
    const params = new HttpParams().set('severity',severity);
    return this.http.get(this.url+'/by-severity',{params});
  }

  getIncidentsByState(state: string): Observable<Incident>{
    const params = new HttpParams().set('completed',state);
    return this.http.get(this.url+'/by-state',{params});
  }

  addIncident(incident:Incident){
    return this.http.post(this.url+'/create',incident);
  }

  updateIncident(incident:Incident){
    return this.http.put(this.url+'/update',incident);
  }

  deleteIncident(incident:any){
    return this.http.delete(this.url+'/delete', { body: incident });
  }
}
