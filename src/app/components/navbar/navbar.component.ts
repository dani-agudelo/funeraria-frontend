import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  theUser: User;
  subscription: Subscription;

  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    private theSecurityService: SecurityService) {
    this.location = location;
  }

  getSecurityService() {
    return this.theSecurityService;
  }

  ngOnInit() {
    // filtrar las rutas que no sean nulas
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    // nos suscribimos a el observable
    this.subscription = this.theSecurityService.getUser().subscribe(user => {
      this.theUser = user;
    });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.theSecurityService.logout();
  }

}
