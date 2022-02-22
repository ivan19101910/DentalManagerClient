import {Component, OnDestroy, OnInit} from '@angular/core';
import {Position} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {PositionService} from "../position.service";

@Component({
  selector: 'app-show-positions',
  templateUrl: './show-positions.component.html',
  styleUrls: ['./show-positions.component.scss']
})
export class ShowPositionsComponent implements OnInit, OnDestroy {

  positions?: Position[]
  pSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.pSub = this.positionService.getAll().subscribe(cities => {
      this.positions = cities
    })

  }

  remove(id:number){
    this.dSub = this.positionService.remove(id).subscribe(() => {
      this.positions = this.positions!.filter(positions => positions.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
