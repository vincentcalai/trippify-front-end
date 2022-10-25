import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateTripModel } from 'src/app/model/create-trip.model';
import { ResponseModel } from 'src/app/model/response.model';
import { ViewTripModel } from 'src/app/model/view-trip.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
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
    public sharedVar: SharedVar,
    public sharedMethod: SharedMethods,
    public router: Router
  ) {
  }

  ngOnInit(): void {

    this.sharedMethod.initializedViewModel();

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

  viewTrip(trip: ViewTripModel){
    this.sharedVar.viewTripModel.id = trip.id;
    this.sharedVar.viewTripModel.budget = trip.budget;
    this.sharedVar.viewTripModel.particulars = trip.particulars;
    this.sharedVar.viewTripModel.tripDetails = trip.tripDetails;
    this.router.navigate(['/manage-trip/manage-trip-view'], { skipLocationChange: true });
  }

  deleteTrip(trip){
    this.apiService.deleteTrip(trip.id).subscribe((resp: any) => {
      this.sharedVar.changeResponse(resp);
      this.retrieveAllTrips(1);
      window.scroll(0,0);
    });
  }

}
