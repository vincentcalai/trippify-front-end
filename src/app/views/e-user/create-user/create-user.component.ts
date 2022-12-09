import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ResponseModel } from 'src/app/model/response.model';
import { UserModel } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  subscriptions: Subscription = new Subscription();
  public createUserForm: FormGroup;

  constructor(public sharedVar: SharedVar,
    public sharedMethods: SharedMethods,
    public reactiveFormService: ReactiveFormService,
    public apiService: ApiService,
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
    if(this.createUserForm.valid){
      const createUserInput = this.sharedVar.createUserModel;
      createUserInput.user.username = this.username?.value;
      createUserInput.user.password = this.password?.value;
      createUserInput.user.email = this.email?.value;
      createUserInput.user.contactNo = this.contactNo?.value;
      this.subscriptions.add(
        this.apiService.postCreateUser().subscribe( (resp: ResponseModel) => {
          this.sharedVar.changeResponse(resp);
          if (resp.statusCode != 0) {
            this.sharedVar.changeException(resp.resultMessage);
          } else {
            this.backToHomeScreen();
          }
        } ,
          error => {
          this.sharedVar.changeException(error);
        })
      );
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
