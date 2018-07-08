import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  authListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log("observable", user);
      } else {
        console.log("no user");
      }
    });
  }

  signInAnonymously() {
    this.afAuth.auth.signInAnonymously()
      .then(user => {
        console.log("signin", user);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
