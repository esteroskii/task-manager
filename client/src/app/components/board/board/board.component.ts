import {Component, NgModule, OnInit} from '@angular/core';
import {List, ListInterface} from '../../../model/list/list.model';
import { MovementIntf } from 'src/app/model/card/movement';
import {BoardService} from '../../../board/board-service';
import {BoardModel} from '../../../model/board/board.model';
import {LocalService} from '../../../board/local/local.service';
import { ProjectStatusesService } from  '../../../_services/project-statuses.service'
import { Staus } from '../../../model/statuses/statuses.model';
import { JsonPipe } from '@angular/common';
import { TaskService } from '../../../_services/task.service'
import { Card } from '../../../model/card/card.model'
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProjectService } from '../../../_services/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  id: string;
  lists: ListInterface[];
  statuses : Staus[];
  cards : Card[];
  constructor( private projectservices: ProjectService,private route:ActivatedRoute,private router:Router,private localService: LocalService, private StatusesService: ProjectStatusesService, private TaskService: TaskService) { 
    this.statuses = [];
    this.cards = [];
    this.lists = [];
    this.id = "";
  }

  async ngOnInit() {
    
    var projectid = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.id = params['id'] || 0;
    });

    console.log("llego"+projectid);

    await this.getStatus();
   
    
    
    // ideally retrive and initialize from some storage.

  }

  getStatus() {
    this.StatusesService.getStates().subscribe((response) => {
      var x =  JSON.parse(JSON.stringify(response));
      this.lists = [];
      x.forEach(element => {
        var status  = new Staus();
        status.id = element.id;
        status.name = element.description;
        this.statuses.push(element);
        const newList: ListInterface = new List();
        newList.position = this.lists.length + 1;
        newList.name = status.name;
        newList.id = status.id;
        this.lists.push(newList);
      });
      this.projectservices.geTasks(this.id).subscribe((response) => {
        console.log(response);
        var x = JSON.parse(JSON.stringify(response));
  
        for (let index = 0; index < this.lists.length; index++) {
          const state = this.lists[index];
          x.forEach(element => {
            if(element.state == state.name){
              var card = new Card(
                element.id,
                element.description,
                "summary",
                element.description
              );
              this.lists[index].cards.push(card);
              console.log(this.lists[index].cards);

            }
          });
        }
  
      })
    }) 
    
  }

 

  addList() {
    this.StatusesService.postState({"description": (this.lists.length + 1).toString()}).subscribe((response) => {
      console.log(response);
    });
    const newList: ListInterface = new List();
    newList.position = this.lists.length + 1;
    newList.name = `List #${newList.position}`;
    
    if (this.lists === undefined) {
      this.lists = [];
    }
    console.log(newList);
    this.lists.push(newList);
  }

  moveCardAcrossList(movementInformation: MovementIntf) {
    var user = JSON.parse(sessionStorage.getItem("auth-user"));
    var idUser = user["id"]; 

    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    this.TaskService.updateTask(cardMoved[0].id,{
      "id" : cardMoved[0].id,
      "state": movementInformation.listname,
      "description": cardMoved[0].description,
      "userId": idUser,
      "projectId": 1
    }).subscribe((response)=>{
      console.log(response);
    })
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx , 0 , ...cardMoved);
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number){
    this.StatusesService.deleteState(listIndex.toString()).subscribe((response) => {
      console.log(response);
    });
  }
}
