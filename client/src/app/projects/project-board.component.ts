import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";


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
  public projectId="";
  public idUser ="";
  public projects :any;
  errorMessage = '';

  //private projectId: string, 
  constructor(private tokenStorageService: TokenStorageService, private route:ActivatedRoute,private router:Router, private projectservices: ProjectService) {
    this.project = [];
  }


  /*
  All Status Initialize
  */
  ngOnInit(): void {
    
    var user = JSON.parse(sessionStorage.getItem("auth-user"));
    this.idUser = user["id"]?user["id"]:''; 
    console.log(this.idUser);

    //it obtains the projects of the specific user
    //Revisar en el api que esta obteniendo los del usuario especifico
    if(this.idUser !=''){
      this.projectservices.getUserProjects(this.idUser).subscribe(
        (response)=>{
          this.projects = response;
          console.log(this.projects);
        },
        err => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
         
        }
      )  
    }else{
      console.log("error")
    }
  }
  // CRUD's Methods for projects
  newProject():void{
    console.log(this.idUser)
  const { name, description} = this.form;
  var projectinfo = {
    "name":name,
    "description":description,
    "userId": this.idUser
  }

  console.log(projectinfo);

    this.projectservices.postProject(projectinfo).subscribe(
      data=>{
        console.log(data);
        this.ngOnInit();
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
       
      }
    )
    
  
  }

  deleteProject(id:string){
    this.projectservices.deleteProject(id).subscribe(
      (response)=>{
        console.log(response);
        this.ngOnInit();
      }
      )
  }

  updateProject() :void{
    this.projectservices.updateproject(this.projectId,this.project).subscribe
  }

  patchProject():void{
    this.projectservices.patchProject(this.projectId,this.project).subscribe
  }

  redirectPage(id:string): void {
    this.router.navigate(['/board'],{ queryParams: {id:id} });
   }

   refreshTable():void{
    this.router.navigateByUrl('/projects', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/projects']);
  }); 
   }


}