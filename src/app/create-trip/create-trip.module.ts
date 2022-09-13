import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CreateBudgetFormComponent } from "./create-budget-form/create-budget-form.component";
import { CreateParticularFormComponent } from "./create-particular-form/create-particular-form.component";
import { CreatePreviewFormComponent } from "./create-preview-form/create-preview-form.component";
import { CreateTripDetailsFormComponent } from "./create-trip-details-form/create-trip-details-form.component";
import { CreateTripRoutingModule } from "./create-trip-routing.module";

@NgModule({
  declarations: [
    CreateParticularFormComponent,
    CreateBudgetFormComponent,
    CreateTripDetailsFormComponent,
    CreatePreviewFormComponent,
  ],
  imports: [
    SharedModule,
    CreateTripRoutingModule
  ]
})
export class CreateTripModule { }
