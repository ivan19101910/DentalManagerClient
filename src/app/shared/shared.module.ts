import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule, FilterPipe],
  declarations: [

    FilterPipe
  ]
})
export class SharedModule{

}
