import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ProgressBannerComponent } from './progress-banner/progress-banner.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SideNavComponent,
    ProgressBannerComponent,
    DestinationsComponent
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    NgbModule,
    NgSelectModule,
    ProgressBannerComponent,
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DestinationsComponent
  ],
  providers: [

  ]
})
export class SharedModule { }
