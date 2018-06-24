import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidenavOpened = false;

  @HostListener('document:mousemove', ['$event']) toggleSidenav(e) {
    if (e.clientX <= 20) {
      this.sidenavOpened = true;
    } else {
    this.sidenavOpened = false;
    }
  }
}
