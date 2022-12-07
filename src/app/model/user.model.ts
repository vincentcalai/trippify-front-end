import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserModel {

    public id: number;
    public username: string;
    public email: string;
    public contactNo: string;

}
