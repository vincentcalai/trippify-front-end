import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageTripHomeComponent } from "./manage-trip-home/manage-trip-home.component";
import { ManageTripViewComponent } from "./manage-trip-view/manage-trip-view.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'manage-trip-home' },
  { path: 'manage-trip-home', component: ManageTripHomeComponent },
  { path: 'manage-trip-view', component: ManageTripViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTripRoutingModule { }
