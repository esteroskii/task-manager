import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:5001/api/project/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

//PROJECTS

  //GET
  getProjects(){
    return this.http.get(AUTH_API)
  }

  getProject(id:string){
    return this.http.get(AUTH_API + id);
  }

 //POST
  postProject(projectinfo:any){
    return this.http.post(AUTH_API, projectinfo, httpOptions);
  }

  //PUT
  updateproject(id:string, projectinfo:any){
    return this.http.put(AUTH_API + id, projectinfo, httpOptions);
  }
  //DELETE
  deleteProject(id:string){
    return this.http.delete(AUTH_API + id);
  }
  //PATCH
  /*
  
  */
  patchProject(id:string, projectinfo:any){
    return this.http.patch(AUTH_API + id, projectinfo, httpOptions);
  }

//TASKS

  //GET
  geTasks(idproject:string){
    return this.http.get(AUTH_API + idproject + "/tasks");
  }

  getProjectTask(idproject:string, idtask:string){
    return this.http.get(AUTH_API + idproject +"/tasks/"+idtask)
  }

  //POST
  /*
  taskinfo: must contain user_id y project_id
  */
  postTask(idproject:string, taskinfo:any){
    return this.http.post(AUTH_API + idproject+"/tasks",taskinfo,httpOptions);
  }
}
