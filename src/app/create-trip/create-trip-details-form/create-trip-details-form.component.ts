import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-trip-details-form',
  templateUrl: './create-trip-details-form.component.html',
  styleUrls: ['./create-trip-details-form.component.css']
})
export class CreateTripDetailsFormComponent implements OnInit {

  subscriptions = new Subscription();
  public createTripDetailsForm: FormGroup;
  noOfTripsEvent: Subject<void> = new Subject<void>();

  tmpDest: string[] = ["Amsterdam", "Brussels", "Singapore", "Lisbon", "Madrid", "Tokyo"];

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public fb: FormBuilder,
    public router:Router) { }

  ngOnInit(): void {
    this.createTripDetailsForm = this.reactiveFormService.initializeCreateTripDetailsForm();
    console.log("logging staticQn2");
    console.log(this.staticQn2);
    this.subscriptions.add(
      this.staticQn2.valueChanges.subscribe(val => {
        this.sharedVar.createTripModel.tripDetails.destinations = [];
        for (let i = 0; i < val; i++) {

          const destinationFormGroup = this.fb.group({
            name:  [null, { validators: [Validators.required]}],
            dateFrom: [null, { validators: [Validators.required]}],
            dateTo: [null, { validators: [Validators.required]}]
          })

          const destination = new Destinations();
          destination.name = '';
          destination.dateFrom = {year: 0, month: 0, day: 0};
          destination.dateTo = {year: 0, month: 0, day: 0};

          this.destinations.push(destinationFormGroup);
          this.sharedVar.createTripModel.tripDetails.destinations.push(destination);
        }
        console.log(this.sharedVar.createTripModel.tripDetails.destinations);
        console.log(this.createTripDetailsForm);

        this.noOfTripsEvent.next(val);
      })
    )
  }

  confirmClicked(){
    if(this.createTripDetailsForm.valid){
      console.log("form is valid...");
      const tripDetails = this.sharedVar.createTripModel.tripDetails;

      //this.navigateToPreviewPage();
    } else{
      console.log("form is invalid!");
      console.log(this.createTripDetailsForm);

      this.reactiveFormService.displayValidationErrors(this.createTripDetailsForm);
    }
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

  get dateFrom(){
    return this.createTripDetailsForm.get('dateFrom');
  }

  get dateTo(){
    return this.createTripDetailsForm.get('dateTo');
  }
}
