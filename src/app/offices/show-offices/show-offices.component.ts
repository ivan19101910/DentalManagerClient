import {Component, OnDestroy, OnInit} from '@angular/core';
import {Position, ShowOffice} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {PositionService} from "../../positions/position.service";
import {OfficeService} from "../office.service";

@Component({
  selector: 'app-show-offices',
  templateUrl: './show-offices.component.html',
  styleUrls: ['./show-offices.component.scss']
})
export class ShowOfficesComponent implements OnInit, OnDestroy
{
  offices?: ShowOffice[]
  oSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private officeService: OfficeService) { }

  ngOnInit(): void {
    this.oSub = this.officeService.getAll().subscribe(offices => {
      this.offices = offices
    })

  }

  remove(id:number){
    this.dSub = this.officeService.remove(id).subscribe(() => {
      this.offices = this.offices!.filter(offices => offices.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.oSub){
      this.oSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
