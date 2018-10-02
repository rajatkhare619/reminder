import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  playerId: string;
  serverURL = 'https://remindmeapplication.herokuapp.com';
  localUrl = 'http://localhost:2000';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  startOneSignal() {
    const  OneSignal = window['OneSignal'] || [];
    console.log("starting onesignal");
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
          OneSignal.push(() => {
            console.log('Register For Push');
            OneSignal.registerForPushNotifications({
              modalPrompt: true
            });
          });
        }

      });
      // Check if user hits the subscribe button

    });


    OneSignal.push(() => {

      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log("The user's subscription state is now:", isSubscribed);
        if (isSubscribed) {
          OneSignal.getUserId().then((userId) => {
            console.log(userId);
            this.playerId = userId;
          });
        }
      });
      OneSignal.getUserId().then((userId) => {
        console.log(userId);
        this.playerId = userId;
      });
    });

  }

  setNotification(message, scheduleTime) {

    this.http.get(`${this.serverURL}/push/${message}/${scheduleTime}/${this.playerId}`)
      .subscribe((data) => {
        if (data["id"]) {
          // this.snackBar.open("SMS success", null, {
          //   duration: 2000
          // });
        }
      });
  }
}
