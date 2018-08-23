import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sidenavOpened = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signInAnonymously();




  }

  @HostListener('document:mousemove', ['$event']) toggleSidenav(e) {
    if (e.clientX <= 20) {
      this.sidenavOpened = true;
    } else {
    this.sidenavOpened = false;
    }
  }
}
