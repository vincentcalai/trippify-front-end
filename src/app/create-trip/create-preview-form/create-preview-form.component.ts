import { Component, OnInit } from '@angular/core';
import { BudgetModel } from 'src/app/model/budget.model';
import { ParticularsModel } from 'src/app/model/particulars.model';
import { TripDetailsModel } from 'src/app/model/trip-details.model';
import { Destinations } from "src/app/model/destinations.model";
import { SharedVar } from 'src/app/services/shared-var.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-preview-form',
  templateUrl: './create-preview-form.component.html',
  styleUrls: ['./create-preview-form.component.css']
})
export class CreatePreviewFormComponent implements OnInit {

  particulars: ParticularsModel;
  budget: BudgetModel;
  tripDetails: TripDetailsModel;
  destinations: Destinations[];

  constructor(
    public sharedVar: SharedVar,
    public router: Router) { }

  ngOnInit(): void {
    console.log(this.sharedVar.createTripModel);
    this.particulars = this.sharedVar.createTripModel.particulars;
    this.budget = this.sharedVar.createTripModel.budget;
    this.tripDetails = this.sharedVar.createTripModel.tripDetails;
    this.destinations = this.sharedVar.createTripModel.tripDetails.destinations;
  }

  confirmClicked(){

  }

  backToBudgetScreen(){
    this.router.navigate(['/create-trip/create-preview'], { skipLocationChange: true });
  }

}
