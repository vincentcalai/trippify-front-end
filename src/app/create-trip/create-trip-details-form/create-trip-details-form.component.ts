import { Component, OnInit, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
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

  tmpDest: string[] = ["Amsterdam", "Brussels", "Singapore", "Lisbon", "Madrid", "Tokyo"];

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public fb: FormBuilder,
    public dateFormatter: NgbDateParserFormatter,
    public router:Router) { }

  ngOnInit(): void {
    this.createTripDetailsForm = this.reactiveFormService.initializeCreateTripDetailsForm();

    const prevRequest = this.sharedVar.createTripModel.tripDetails;
    console.log("prevRequest");
    console.log(prevRequest);
    if(prevRequest && prevRequest.noOfDestinations && prevRequest.destinations){
      console.log("setting staticQn2 value");
      this.staticQn2.setValue(prevRequest.noOfDestinations);
      // this.destinations.controls.forEach(destination => {
      //   destination.value.dateFrom = this.dateFormatter.format(destination.dateFrom);
      //   destination.dateToStr = this.dateFormatter.format(destination.dateTo);
      // });
    }

    this.subscriptions.add(
      this.staticQn2.valueChanges.subscribe(val => {
        console.log(this.createTripDetailsForm);
        this.noOfTripsEvent.next(val);
      })
    )
  }

  confirmClicked(){
    this.destinationsComponent.validateAllDate();

    if(this.createTripDetailsForm.valid){
      console.log("form is valid...");

      this.sharedVar.createTripModel.tripDetails.noOfDestinations = this.staticQn2.value;
      const destinations = this.sharedVar.createTripModel.tripDetails.destinations;

      console.log(destinations);
      destinations.forEach(destination => {
        destination.dateFromStr = this.dateFormatter.format(destination.dateFrom);
        destination.dateToStr = this.dateFormatter.format(destination.dateTo);
      });

      this.navigateToPreviewPage();
    } else{
      console.log("form is invalid!");
      console.log(this.createTripDetailsForm);

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
