import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedMethods {



  constructor(private router: Router) { }


  showForm(form: string) {
    let route: string[] = [];
    if (form == "create") {
      route = ['create-trip'];
    } else if (form == "manage") {
      route = ['manage-trip'];
    }
    console.log('route : ' + route);
    this.router.navigate(route, { skipLocationChange: true });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
}
