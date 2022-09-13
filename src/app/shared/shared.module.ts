import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ProgressBannerComponent } from './progress-banner/progress-banner.component';

@NgModule({
  declarations: [
    SideNavComponent,
    ProgressBannerComponent
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    NgSelectModule,
    ProgressBannerComponent,
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [

  ]
})
export class SharedModule { }
