import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-banner',
  templateUrl: './progress-banner.component.html',
  styleUrls: ['./progress-banner.component.css']
})
export class ProgressBannerComponent implements OnInit {

  @Input() currentProgress: string;
  @Input() isViewTripScreen: boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
