import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateTripModel } from 'src/app/model/create-trip.model';
import { ResponseModel } from 'src/app/model/response.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-manage-trip-home',
  templateUrl: './manage-trip-home.component.html',
  styleUrls: ['./manage-trip-home.component.css']
})
export class ManageTripHomeComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public trips : CreateTripModel[];
  public responseMsg: string = '';

  constructor(
    public apiService: ApiService,
    public sharedVar: SharedVar
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
        this.sharedVar.responseSource
        .subscribe(resp => {
          if(resp){
            this.responseMsg = resp.resultMessage;
          }
        }
      )
    )

    this.subscriptions.add(
        this.apiService.getAllTrips().subscribe((resp: any) => {
          this.trips = resp.tripList;
        } ,
          error => {
          this.sharedVar.changeException(error);
        }
      )
    );
  }



}
