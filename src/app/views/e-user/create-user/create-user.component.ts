import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public createUserForm: FormGroup;

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public reactiveFormService: ReactiveFormService,
    public router: Router) { }

  ngOnInit(): void {
    this.sharedMethods.initializeCreateUserModel();
    this.createUserForm = this.initializeCreateUserForm();
  }

  initializeCreateUserForm(): FormGroup {
    const rfg =  this.reactiveFormService.initializeCreateUserForm();
    return rfg;
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  backToHomeScreen(){
    this.router.navigate([''], { skipLocationChange: true });
  }

  confirmClicked(){
    console.log("create user success!");
    if(this.createUserForm.valid){
      const createUserInput = this.sharedVar.createUserModel;
      createUserInput.user.username = this.username?.value;
      createUserInput.user.password = this.password?.value;
      createUserInput.user.cfmPassword = this.cfmPassword?.value;
      createUserInput.user.email = this.email?.value;
      createUserInput.user.contactNo = this.contactNo?.value;
      this.backToHomeScreen();
    } else{
      this.reactiveFormService.displayValidationErrors(this.createUserForm);
    }
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get cfmPassword() {
    return this.createUserForm.get('cfmPassword');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get contactNo() {
    return this.createUserForm.get('contactNo');
  }


}
