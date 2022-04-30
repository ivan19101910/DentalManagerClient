import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WorkerService} from "../worker.service";
import {ShowWorker} from "../../shared/interfaces";


@Component({
  selector: 'app-show-worker',
  templateUrl: './show-worker.component.html',
  styleUrls: ['./show-worker.component.scss']
})
export class ShowWorkerComponent implements OnInit, OnDestroy {

  workers?: ShowWorker[]
  wSub?: Subscription
  dSub?: Subscription


  page: number = 1;
//for search
  filteredWorkers!: ShowWorker[]
  nameSearchField!: string
  surnameSearchField!: string
  positionSearchField!: string
  citySearchField!: string
  officeAddressSearchField!: string
//
  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.wSub = this.workerService.getAll().subscribe(workers => {
      this.workers = workers
      this.filteredWorkers = workers;
    })
  }

  filter(){
    this.filteredWorkers = this.workers!
    if(this.nameSearchField){
      this.filteredWorkers = this.filteredWorkers!.filter(app => app.firstName == this.nameSearchField)
    }
    if(this.surnameSearchField){
      this.filteredWorkers = this.filteredWorkers!.filter(app => app.lastName == this.surnameSearchField)
    }
    if(this.positionSearchField){
      this.filteredWorkers = this.filteredWorkers!.filter(app => app.positionName == this.positionSearchField)
    }
    if(this.citySearchField){
      this.filteredWorkers = this.filteredWorkers!.filter(app => app.city == this.citySearchField)
    }
    if(this.officeAddressSearchField){
      this.filteredWorkers = this.filteredWorkers!.filter(app => app.officeAddress == this.officeAddressSearchField)
    }
  }
  clearFilter(){
    // @ts-ignore
    this.nameSearchField = null
    // @ts-ignore
    this.surnameSearchField = null
    // @ts-ignore
    this.positionSearchField = null
    // @ts-ignore
    this.citySearchField = null
    // @ts-ignore
    this.officeAddressSearchField = null
    this.filteredWorkers = this.workers!
  }

  ngOnDestroy(){
    if(this.wSub){
      this.wSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  remove(id:number){
    this.dSub = this.workerService.remove(id).subscribe(() => {
      this.workers = this.workers!.filter(workers => workers.id !== id)
    })
  }

}
