import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SideNavComponent } from "./side-nav/side-nav.component";

@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    NgSelectModule,
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [

  ]
})
export class SharedModule { }
