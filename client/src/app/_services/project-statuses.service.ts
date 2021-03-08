import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:5001/api/project_statuses/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusesService {

  constructor(private http: HttpClient) { }

  //STATUES
  
  //GET
  getStates(){
    return this.http.get(AUTH_API)
  }

  getState(id:string){
    return this.http.get(AUTH_API + id)
  }

  //POST
  postState(stateinfo:any){
    return this.http.post(AUTH_API, stateinfo, httpOptions)
  }

  //PUT
  updateState(id:string, stateinfo:any){
    return this.http.put(AUTH_API + id, stateinfo, httpOptions)
  }

  //DELETE
  deleteState(id:string){
    return this.http.delete(AUTH_API + id)
  }
  //PATCH
  patchState(id:string, stateinfo:any){
    return this.http.patch(AUTH_API + id, stateinfo, httpOptions)
  }
}
