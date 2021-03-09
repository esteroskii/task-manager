import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {
  form: any = {
    name: null,
    description: null
  };

  public project: any;
  public userId="1";
  public projectId="";
  public projects :any;
  errorMessage = '';

  //private projectId: string, 
  constructor( private projectservices: ProjectService) {
    this.project = [];
  }

  /*
  All Status Initialize
  */
  ngOnInit(): void {

    //it obtains the projects of the specific user
    //Revisar en el api que esta obteniendo los del usuario especifico
    this.projectservices.getUserProjects(this.userId).subscribe(
      (response)=>{
        this.projects = response;
        console.log(this.projects);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
       
      }
    )  
  
  }
  // CRUD's Methods for projects
  newProject():void{
  const { name, description} = this.form;
  var projectinfo = {
    "name":name,
    "description":description
  }
    this.projectservices.postProject(projectinfo).subscribe(
      data=>{
        console.log(data);
      },
      
      
    )
  }

  deleteProject() :void{
    this.projectservices.deleteProject(this.projectId).subscribe
  }

  updateProject() :void{
    this.projectservices.updateproject(this.projectId,this.project).subscribe
  }

  patchProject():void{
    this.projectservices.patchProject(this.projectId,this.project).subscribe
  }

}