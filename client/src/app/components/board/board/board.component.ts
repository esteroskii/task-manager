import {Component, NgModule, OnInit} from '@angular/core';
import {List, ListInterface} from '../../../model/list/list.model';
import { MovementIntf } from 'src/app/model/card/movement';
import {BoardService} from '../../../board/board-service';
import {BoardModel} from '../../../model/board/board.model';
import {LocalService} from '../../../board/local/local.service';
import { ProjectStatusesService } from  '../../../_services/project-statuses.service'
import { Staus } from '../../../model/statuses/statuses.model';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {


  lists: ListInterface[];
  statuses : Staus[];
  constructor(private localService: LocalService, private StatusesService: ProjectStatusesService) { 
    this.statuses = [];
  }

  ngOnInit() {


    this.StatusesService.getStates().subscribe((response) => {
      var x =  JSON.parse(JSON.stringify(response));
      x.forEach(element => {
        var status  = new Staus();
        status.id = element.id;
        status.name = element.description;
        console.log(status);
        this.statuses.push(element);
        const newList: ListInterface = new List();
        newList.position = this.lists.length + 1;
        newList.name = status.name;
        newList.id = status.id;
        if (this.lists === undefined) {
          this.lists = [];
        }
        console.log(newList);
        this.lists.push(newList);
      });
      
    }) 
    
    
    const board = this.localService.getBoard();
    this.lists = board.lists || [];

    // ideally retrive and initialize from some storage.

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
    const cardMoved = this.lists[movementInformation.fromListIdx].cards.splice(movementInformation.fromCardIdx, 1);
    console.log(cardMoved);
    this.lists[movementInformation.toListIdx].cards.splice(movementInformation.toCardIdx , 0 , ...cardMoved);
  }

  saveBoard() {
    const boardModel = new BoardModel();
    boardModel.lists = this.lists;
    this.localService.saveBoard(boardModel);
  }

  deleteList(listIndex: number){
      this.lists.splice(listIndex,1);
  }
}
