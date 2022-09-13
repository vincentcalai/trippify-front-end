import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";
import { ManageTripHomeComponent } from "./manage-trip-home/manage-trip-home.component";
import { ManageTripRoutingModule } from "./manage-trip-routing.module";

@NgModule({
  declarations: [
    ManageTripHomeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManageTripRoutingModule
  ]
})
export class ManageTripModule { }
