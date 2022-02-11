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

  constructor(private workerService: WorkerService) { }

  ngOnInit(): void {
    this.wSub = this.workerService.getAll().subscribe(workers => {
      this.workers = workers
    })
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
