import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetModel } from 'src/app/model/budget.model';
import { Destinations } from 'src/app/model/destinations.model';
import { ParticularsModel } from 'src/app/model/particulars.model';
import { TripDetailsModel } from 'src/app/model/trip-details.model';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-manage-trip-view',
  templateUrl: './manage-trip-view.component.html',
  styleUrls: ['./manage-trip-view.component.css']
})
export class ManageTripViewComponent implements OnInit {

  particulars: ParticularsModel;
  budget: BudgetModel;
  tripDetails: TripDetailsModel;
  destinations: Destinations[];

  constructor(
    public sharedVar: SharedVar,
    public router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.sharedVar.viewTripModel);
    this.particulars = this.sharedVar.viewTripModel.particulars;
    this.budget = this.sharedVar.viewTripModel.budget;
    this.tripDetails = this.sharedVar.viewTripModel.tripDetails;
    this.destinations = this.sharedVar.viewTripModel.tripDetails.destinations;
  }

  backToManageTripHomeScreen(){
    this.router.navigate(['/manage-trip/manage-trip-home'], { skipLocationChange: true });
  }

}
