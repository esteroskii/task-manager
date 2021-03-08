import { Component, OnInit } from '@angular/core';
//services
import { ProjectStatusesService} from '../_services/project-statuses.service';
import { TaskService} from '../_services/task.service';
import { ProjectService } from '../_services/project.service'

//tags
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})

//class
export class TaskBoardComponent implements OnInit {

  public statuses: any;
  public task: any;
  public taskId ='';
  public project: any;
  errorMessage = '';
  public projectId='';

  //private projectId: string,
  constructor( private projectservices: ProjectService, private taskservice: TaskService, private projectstatusesservice: ProjectStatusesService) {
    this.statuses = [];
    this.task = [];
    this.project = [];
   }
   //Initiation Method
  ngOnInit(): void {
      //Get 
     //it obtains the tasks of a specific project
     this.projectservices.geTasks(this.projectId).subscribe(
      response => {
        this.task = response;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
       
      }
    )
    // it obtains the status of the Tasks
    this.projectstatusesservice.getStates().subscribe(
      (response) => {
        this.statuses = response;
      }
    )
  }

  // CRUD's Methods for Taskss
  newTask():void{
    this.taskservice.postTask(this.task).subscribe
  }

  deleteTask() :void{
    this.taskservice.deleteTask(this.taskId).subscribe
  }

  updateTask() :void{
    this.taskservice.updateTask(this.taskId, this.task);   
  }

  //Change Task Status
  statusTask():void{
  //this.projectstatusesservice.updateState()
  }

}
