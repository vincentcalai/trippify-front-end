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

  totalItems: number = 0;
  itemsPerPage: number = 10;
  p: number = 1;

  constructor(
    public apiService: ApiService,
    public sharedVar: SharedVar
  ) {
  }

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
        this.apiService.getAllTrips(this.p, this.itemsPerPage).subscribe((resp: any) => {
          this.trips = resp.tripList.content;
          this.p = resp.tripList.page;
          this.totalItems = resp.tripList.totalElements;
        } ,
          error => {
          this.sharedVar.changeException(error);
        }
      )
    );
  }

  retrieveAllTrips(page){
    this.apiService.getAllTrips(page, this.itemsPerPage).subscribe((resp: any) => {
        this.trips = resp.tripList.content;
        this.p = page;
        this.totalItems = resp.tripList.totalElements;
    } ,
      error => {
      this.sharedVar.changeException(error);
    });
  }

  deleteTrip(trip){
    this.apiService.deleteTrip(trip.id).subscribe((resp: any) => {
      this.sharedVar.changeResponse(resp);
      this.retrieveAllTrips(1);
      window.scroll(0,0);
    });
  }

}
