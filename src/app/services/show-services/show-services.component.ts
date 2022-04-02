import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Service} from "../../shared/interfaces";
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
  categories: any[] = [
    {id: 1, categoryName:"Послуга"},
    {id: 2, categoryName:"Тип"},
    {id: 3, categoryName:"Ціна"}
  ]
  dataSource!: MatTableDataSource<Service>
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  services?: Service[]
  pSub?: Subscription
  dSub?: Subscription

  //page: number = 1;
  searchString = ''
  displayedColumns: string[] = ['name', 'serviceTypeName', 'price', 'action'];

  constructor(private serviceService: ServiceService) { }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.pSub = this.serviceService.getAll().subscribe(services => {
      this.services = services
      this.dataSource = new MatTableDataSource<Service>(services)

      this.dataSource.paginator = this.paginator
      console.log(this.dataSource)
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
  applyFilter($event : any){
    this.dataSource!.filter = $event.target.value.trim().toLowerCase()
    console.log('filter')
  }

  remove(id:number){
    this.dSub = this.serviceService.remove(id).subscribe(() => {
      this.services = this.services!.filter(services => services.id !== id)
    })
  }

}
