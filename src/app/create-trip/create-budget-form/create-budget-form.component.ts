import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
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

  public subscriptions = new Subscription();


  constructor(public reactiveFormService: ReactiveFormService, public sharedVar:SharedVar) { }


  ngOnInit(): void {
    this.createTripBudgetForm = this.reactiveFormService.initializeCreateTripBudgetForm();

    this.subscriptions.add(

    )
  }

  onManualSwitchChange(){
    console.log("onManualSwitchChange called!");
    console.log(this.isManualCalEnabled);
    if(this.isManualCalEnabled){
      this.totalBudget.disable();
    }
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  confirmClicked(){
    console.log("isManualCalEnabled: "+ this.isManualCalEnabled);
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
