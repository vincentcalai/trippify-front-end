import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-budget-form',
  templateUrl: './create-budget-form.component.html',
  styleUrls: ['./create-budget-form.component.css']
})
export class CreateBudgetFormComponent implements OnInit, OnDestroy {

  public createTripBudgetForm: FormGroup;
  public isManualCalEnabled: boolean;

  subscriptions = new Subscription();


  flightBudgetPct = this.sharedVar.FLIGHT_BUDGET_PCT/100;
  hotelBudgetPct = this.sharedVar.HOTEL_BUDGET_PCT/100;
  transportBudgetPct = this.sharedVar.TRANSPORT_BUDGET_PCT/100;
  attractionBudgetPct = this.sharedVar.ATTRACTION_BUDGET_PCT/100;
  otherBudgetPct = this.sharedVar.OTHER_BUDGET_PCT/100;

  constructor(
    public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public router:Router) {
  }


  ngOnInit(): void {
    this.createTripBudgetForm = this.reactiveFormService.initializeCreateTripBudgetForm();

    this.subscriptions.add(

    )
  }

  onManualSwitchChange(){
    console.log("onManualSwitchChange called!");
    console.log(this.isManualCalEnabled);
    this.totalBudget.setValue(null);
    if(this.isManualCalEnabled){
      this.totalBudget.disable();
    } else{
      this.totalBudget.enable();
    }
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  computeBudget(){
    if(this.totalBudget.valid){
      const totalBudgetCompute = this.totalBudget.value;
      this.flightBudget.setValue((totalBudgetCompute * this.flightBudgetPct).toFixed(2));
      this.hotelBudget.setValue((totalBudgetCompute * this.hotelBudgetPct).toFixed(2));
      this.transportBudget.setValue((totalBudgetCompute * this.transportBudgetPct).toFixed(2));
      this.attractionBudget.setValue((totalBudgetCompute * this.attractionBudgetPct).toFixed(2));
      this.otherBudget.setValue((totalBudgetCompute * this.otherBudgetPct).toFixed(2));
    } else{
      this.reactiveFormService.displayValidationErrors(this.totalBudget);
    }
  }

  confirmClicked(){
    if(this.createTripBudgetForm.valid){
      console.log("form is valid!");
      const budget = this.sharedVar.createTripModel.budget;

      budget.totalBudget = this.totalBudget?.value;
      budget.flightBudget = this.flightBudget?.value;
      budget.hotelBudget = this.hotelBudget?.value;
      budget.transportBudget = this.transportBudget?.value;
      budget.attractionBudget = this.attractionBudget?.value;
      budget.otherBudget = this.otherBudget?.value;

      console.log("logging budget");
      console.log(budget);
      console.log(this.sharedVar.createTripModel.budget);

      this.navigateToTripDetailsPage();
    } else{
      console.log("form is invalid!");
      this.reactiveFormService.displayValidationErrors(this.createTripBudgetForm);
    }
  }

  navigateToTripDetailsPage() {
    this.router.navigate(['/create-trip/create-trip-details'], { skipLocationChange: true });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get totalBudget(){
    return this.createTripBudgetForm.get('totalBudget');
  }

  get flightBudget(){
    return this.createTripBudgetForm.get('flightBudget');
  }

  get hotelBudget(){
    return this.createTripBudgetForm.get('hotelBudget');
  }

  get transportBudget(){
    return this.createTripBudgetForm.get('transportBudget');
  }

  get attractionBudget(){
    return this.createTripBudgetForm.get('attractionBudget');
  }

  get otherBudget(){
    return this.createTripBudgetForm.get('otherBudget');
  }

}
