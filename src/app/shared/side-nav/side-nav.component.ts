import { Component, OnInit } from '@angular/core';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(
    public sharedVar: SharedVar,
    public sharedMethods: SharedMethods
  ) { }

  scrollToTop() {
    this.sharedMethods.scrollToTop();
  }

}
