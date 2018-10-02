import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  serverURL = 'https://remindmeapplication.herokuapp.com';
  localUrl = 'http://localhost:2000';
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  sendEmail(message, to, scheduledTime) {
    const delayInMinutes = Math.round((scheduledTime.getTime() - new Date().getTime()) / 60000);
     this.http.get(`${this.serverURL}/email/${message}/${to}/${delayInMinutes}`, {responseType: 'text'})
      .subscribe(data => {
        if (data["success"]) {
          // this.snackBar.open("SMS success", null, {
          //   duration: 2000
          // });
        }
      });
  }
}
