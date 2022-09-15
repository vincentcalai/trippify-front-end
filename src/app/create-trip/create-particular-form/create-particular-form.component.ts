import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-particular-form',
  templateUrl: './create-particular-form.component.html',
  styleUrls: ['./create-particular-form.component.css']
})
export class CreateParticularFormComponent implements OnInit {

  subscriptions = new Subscription();
  public createTripParticularForm: FormGroup;
  public isUserRegistered: any = null;
  public username = ["VINCENT"];


  constructor(public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    private router: Router) { }

  ngOnInit(): void {
    this.createTripParticularForm = this.initializecreateTripParticularForm();

    this.subscriptions.add(
      this.createTripParticularForm.get('staticQn1')!.valueChanges.subscribe(val => {
        this.isUserRegistered = this.sharedVar.STATIC_QN_1_VAL_MAP.get(val);
        if(!this.isUserRegistered){
          this.createTripParticularForm.get('email')?.enable();
        }
        this.resetForm();
      })
    )

    this.subscriptions.add(
      this.createTripParticularForm.get('name')!.valueChanges.subscribe(val => {
        if(this.isUserRegistered){
          this.retrieveUserEmail();
          this.createTripParticularForm.get('email')?.disable();
        }
      })
    )
  }
  resetForm() {
    this.createTripParticularForm.get('name')?.markAsPristine();
    this.createTripParticularForm.get('email')?.markAsPristine();
    this.name?.setValue(null);
    this.email?.setValue(null);
  }

  retrieveUserEmail(){
    console.log(this.createTripParticularForm.get('name')!.value);
    if(this.createTripParticularForm.get('name')!.value){
      this.email?.setValue("VINCENTCALAI@GMAIL.COM");
    }
  }

  initializecreateTripParticularForm(): FormGroup {
    const rfg =  this.reactiveFormService.initializeCreateTripForm();
    return rfg;
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  confirmClicked(){
    console.log("confirm clicked!" + " is form valid? : " + this.createTripParticularForm.valid);
    console.log(this.createTripParticularForm);
    if(this.createTripParticularForm.valid){
      console.log("form is valid!");
      const particulars = this.sharedVar.createTripModel.particulars;

      console.log(this.name?.value);
      console.log(this.email?.value);

      particulars.name = this.name?.value;
      particulars.email = this.email?.value;

      console.log("logging particulars");
      console.log(particulars);
      console.log(this.sharedVar.createTripModel.particulars);

      this.navigateToBudgetPage();
    } else{
      console.log("form is invalid!");
      this.reactiveFormService.displayValidationErrors(this.createTripParticularForm);
    }
  }
  navigateToBudgetPage() {
    this.router.navigate(['/create-trip/create-budget'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get staticQn1() {
    return this.createTripParticularForm.get('staticQn1');
  }

  get name() {
    return this.createTripParticularForm.get('name');
  }

  get email() {
    return this.createTripParticularForm.get('email');
  }

}
