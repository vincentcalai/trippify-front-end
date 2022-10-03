import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BudgetModel } from 'src/app/model/budget.model';
import { ParticularsModel } from 'src/app/model/particulars.model';
import { TripDetailsModel } from 'src/app/model/trip-details.model';
import { Destinations } from "src/app/model/destinations.model";
import { SharedVar } from 'src/app/services/shared-var.service';
import { Router } from '@angular/router';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api/api.service';
import { take } from 'rxjs/operators';

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
  modalRef: BsModalRef;
  @ViewChild('confirmInputsModal', { static: true }) confirmInputsModal: TemplateRef<any>;

  constructor(
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public router: Router,
    public modalService: BsModalService,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.particulars = this.sharedVar.createTripModel.particulars;
    this.budget = this.sharedVar.createTripModel.budget;
    this.tripDetails = this.sharedVar.createTripModel.tripDetails;
    this.destinations = this.sharedVar.createTripModel.tripDetails.destinations;
    console.log(this.destinations);
  }

  confirmClicked(){
    this.modalRef = this.modalService.show(this.confirmInputsModal, this.sharedVar.sharedModalConfig);
  }

  confirmTrip(){
    this.apiService.postCreateTrip().pipe(take(1)).subscribe(resp => {
      console.log(resp);
    })
  }

  backToTripDetailsScreen(){
    this.router.navigate(['/create-trip/create-trip-details'], { skipLocationChange: true });
  }

}
