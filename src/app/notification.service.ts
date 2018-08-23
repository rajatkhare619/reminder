import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
      playerId: string;
      serverURL = 'https://remindmeapplication.herokuapp.com';

  constructor(private http: HttpClient) { }

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

      });
      OneSignal.getUserId().then((userId) => {
        console.log(userId);
        this.playerId = userId;
      });
    });

  }

  setNotification(message, scheduleTime) {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json; charset=utf-8',
//         'Authorization': 'Basic ZGI5MTk3MjQtYmFmZi00YWM2LWJhMTEtMDUzYWMyNTM3N2Zm'
//       })
//     };
//     const body = {
//       "app_id": "5a844928-023c-4201-bb5d-d055cd760859",
//       "include_player_ids": [this.playerId],
//       "data": {"foo": "bar"},
//       "contents": {"en": message},
//       "send_after": scheduleTime
//     };
// console.log(body);
//     this.http.post(this.url, body, httpOptions)
//       .subscribe(res => {
//         console.log(res);
//       } );

    this.http.get(`${this.serverURL}/push/${message}/${scheduleTime}/${this.playerId}`)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
