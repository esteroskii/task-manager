import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:5001/api/task/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  //TASKS

  //GET
  geTasks(){
    return this.http.get(AUTH_API)
  }

  getTask(id:string){
    return this.http.get(AUTH_API + id)
  }

  //POST
  postTask(taskinfo:any){
    return this.http.post(AUTH_API, taskinfo, httpOptions)
  }

  //PUT
  updateTask(id:string, stateinfo:any){
    return this.http.put(AUTH_API + id, stateinfo,httpOptions)
  }

  //DELETE 
  deleteTask(id:string){
    return this.http.delete(AUTH_API + id)
  }

}
