import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  serverURL = 'https://remindmeapplication.herokuapp.com';
  localUrl = 'http://localhost:2000';
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  sendSms(message, number, scheduledTime) {

    const unixTimestamp =  Math.round(new Date(scheduledTime).getTime()/1000);

   this.http.get(`${this.serverURL}/sms/${number}/${message}/${unixTimestamp}`, {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
        if (data.length >= 20) {
          // this.snackBar.open("SMS success", null, {
          //   duration: 2000
          // });
        }
      });
  }

}
