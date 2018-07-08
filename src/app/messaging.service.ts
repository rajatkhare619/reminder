import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as fb from 'firebase';
import {BehaviorSubject} from "rxjs";
import {take} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

messaging = fb.messaging();
currentMsg = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) {
      return  console.log( "Not logged in");
      }

      const data = { [user.uid]: token};
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
      console.log("Permission granted");
      return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(msg => {
      console.log(msg);
      this.currentMsg.next(msg);
    });
  }
}
