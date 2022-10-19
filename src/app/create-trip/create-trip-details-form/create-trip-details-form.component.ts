import { Component, OnInit, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { DestinationsComponent } from 'src/app/shared/destinations/destinations.component';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';

@Component({
  selector: 'app-create-trip-details-form',
  templateUrl: './create-trip-details-form.component.html',
  styleUrls: ['./create-trip-details-form.component.css']
})
export class CreateTripDetailsFormComponent implements OnInit {

  @ViewChild(DestinationsComponent) destinationsComponent: DestinationsComponent;

  subscriptions = new Subscription();
  public createTripDetailsForm: FormGroup;
  noOfTripsEvent: Subject<void> = new Subject<void>();

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public fb: FormBuilder,
    public dateFormatter: NgbDateParserFormatter,
    public router:Router) { }

  ngOnInit(): void {
    this.createTripDetailsForm = this.reactiveFormService.initializeCreateTripDetailsForm();

    const prevRequest = this.sharedVar.createTripModel.tripDetails;
    if(prevRequest && prevRequest.noOfDestinations && prevRequest.destinations){
      this.staticQn2.setValue(prevRequest.noOfDestinations);
    }

    this.subscriptions.add(
      this.staticQn2.valueChanges.subscribe(staticQn2Ans => {
        this.sharedVar.createTripModel.tripDetails.noOfDestinations = staticQn2Ans;
        this.noOfTripsEvent.next(staticQn2Ans);
      })
    )
  }

  confirmClicked(){
    this.destinationsComponent.validateAllDate();
    if(this.createTripDetailsForm.valid){
      const destinations = this.sharedVar.createTripModel.tripDetails.destinations;
      destinations.splice(this.staticQn2.value);

      destinations.forEach(destination => {
        destination.dateFromStr = this.dateFormatter.format(destination.dateFrom);
        destination.dateToStr = this.dateFormatter.format(destination.dateTo);
        destination.dateFromDayName = this.sharedMethods.getDayName(destination.dateFromStr);
        destination.dateToDayName = this.sharedMethods.getDayName(destination.dateToStr);
        destination.noOfTripDays = this.sharedMethods.getDayDiff(destination.dateFromStr, destination.dateToStr) + 1;
      });

      this.navigateToPreviewPage();
    } else{
      this.reactiveFormService.displayValidationErrors(this.createTripDetailsForm);
    }
  }

  navigateToPreviewPage() {
    this.router.navigate(['/create-trip/create-preview'], { skipLocationChange: true });
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  backToBudgetScreen(){
    this.router.navigate(['/create-trip/create-budget'], { skipLocationChange: true });
  }

  get staticQn2(){
    return this.createTripDetailsForm.get('staticQn2');
  }

  get destinations(){
    return this.createTripDetailsForm.controls['destinations'] as FormArray;
  }
}
