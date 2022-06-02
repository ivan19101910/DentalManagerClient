import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Service, ServiceType, ShowWorker} from "../../shared/interfaces";
import {filter, Subscription} from "rxjs";
import {ServiceService} from "../service.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-show-services',
  templateUrl: './show-services.component.html',
  styleUrls: ['./show-services.component.scss']
})
export class ShowServicesComponent implements OnInit, OnDestroy {

  services?: Service[]
  pSub?: Subscription
  stSub?: Subscription
  dSub?: Subscription
  page: number = 1
  //for search
  serviceTypes?: ServiceType[]
  filteredServices!: Service[]
  nameSearchField!: string
  typeSearchField!: string
  priceSearchField!: number
  //for confirmation window
  deleteConfirmation = false
  idForDelete: number = 0
//

  constructor(private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.pSub = this.serviceService.getAll().subscribe(services => {
      this.services = services
      this.filteredServices = services
      this.stSub = this.serviceService.getAllTypes().subscribe(types => {
        this.serviceTypes = types
      })
    })

  }

  filter(){
    this.filteredServices = this.services!
    console.log(this.typeSearchField)
    if(this.nameSearchField){
      this.filteredServices = this.filteredServices!.filter(app => app.name == this.nameSearchField)
    }
    if(this.typeSearchField){
      this.filteredServices = this.filteredServices!.filter(app => app.serviceTypeName == this.typeSearchField)
    }
    if(this.priceSearchField){
      this.filteredServices = this.filteredServices!.filter(app => app.price == this.priceSearchField)
    }
  }
  clearFilter(){
    // @ts-ignore
    this.nameSearchField = null
    // @ts-ignore
    this.typeSearchField = null
    // @ts-ignore
    this.priceSearchField = null
    this.filteredServices = this.services!
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  confirmDelete(id:number){
    this.deleteConfirmation = true;
    this.idForDelete = id;
  }
  unconfirmDelete(){
    this.deleteConfirmation = false;
    this.idForDelete = 0;
  }

  remove(id:number){
    this.dSub = this.serviceService.remove(id).subscribe(() => {
      this.services = this.services!.filter(services => services.id !== id)
      this.filteredServices = this.filteredServices!.filter(services => services.id !== id)

      this.deleteConfirmation = false;
      this.idForDelete = 0;
    })
  }

}
