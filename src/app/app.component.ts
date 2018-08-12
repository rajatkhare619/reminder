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
    const OneSignal = window['OneSignal'] || [];

    OneSignal.push(["init", {
      appId: "5a844928-023c-4201-bb5d-d055cd760859",
      autoRegister: false,
      notifyButton: {
        enable: true
      }
    }]);

    OneSignal.push(() => {
      // Check if subscribed on load
      OneSignal.isPushNotificationsEnabled().then((isSubscribed) => {
        if (!isSubscribed) {
          OneSignal.push(function () {
            console.log('Register For Push');
            OneSignal.registerForPushNotifications({
              modalPrompt: true
            });
          });
        }
      });
      // Check if user hits the subscribe button

    })
    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log("The user's subscription state is now:", isSubscribed);
        OneSignal.getUserId().then(function (userId) {
          console.log("User ID is", userId);
        });
      });
    });


  }

  @HostListener('document:mousemove', ['$event']) toggleSidenav(e) {
    if (e.clientX <= 20) {
      this.sidenavOpened = true;
    } else {
    this.sidenavOpened = false;
    }
  }
}
