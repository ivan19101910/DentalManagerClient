import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.scss']
})
export class ShowServicesComponent implements OnInit, OnDestroy {

  services?: Service[]
  pSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.pSub = this.serviceService.getAll().subscribe(services => {
      this.services = services
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

  remove(id:number){
    this.dSub = this.serviceService.remove(id).subscribe(() => {
      this.services = this.services!.filter(services => services.id !== id)
    })
  }

}
