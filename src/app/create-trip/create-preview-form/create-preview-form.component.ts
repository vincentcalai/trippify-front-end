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
import { finalize, take } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { Subscription, throwError } from 'rxjs';
import { ResponseModel } from 'src/app/model/response.model';

@Component({
  selector: 'app-create-preview-form',
  templateUrl: './create-preview-form.component.html',
  styleUrls: ['./create-preview-form.component.css']
})
export class CreatePreviewFormComponent implements OnInit {

  subscriptions: Subscription = new Subscription();
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
  }

  confirmClicked(){
    this.modalRef = this.modalService.show(this.confirmInputsModal, this.sharedVar.sharedModalConfig);
  }

  confirmTrip(){
    this.sharedVar.changeException('');
    this.subscriptions.add(
      this.apiService.postCreateTrip().pipe(take(1), finalize(() => {
        this.modalRef.hide();
        this.navigateToManageTripPage();
      })).subscribe( (resp: ResponseModel) => {
        this.sharedVar.changeResponse(resp);
        if (resp.statusCode != 0) {
          this.sharedVar.changeException(resp.resultMessage);
        }
      } ,
        error => {
        this.sharedVar.changeException(error);
      })
    );
  }

  navigateToManageTripPage(){
    return this.router.navigate(['/manage-trip/manage-trip-home'], { skipLocationChange: true });
  }

  backToTripDetailsScreen(){
    this.router.navigate(['/create-trip/create-trip-details'], { skipLocationChange: true });
  }

}
