import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateBudgetFormComponent } from "./create-budget-form/create-budget-form.component";
import { CreateParticularFormComponent } from "./create-particular-form/create-particular-form.component";
import { CreatePreviewFormComponent } from "./create-preview-form/create-preview-form.component";
import { CreateTripDetailsFormComponent } from "./create-trip-details-form/create-trip-details-form.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-particular' },
  { path: 'create-particular', component: CreateParticularFormComponent },
  { path: 'create-budget', component: CreateBudgetFormComponent },
  { path: 'create-trip-details', component: CreateTripDetailsFormComponent },
  { path: 'create-preview', component: CreatePreviewFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTripRoutingModule { }
