import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  serverURL = 'https://remindmeapplication.herokuapp.com';
  constructor(private http: HttpClient) { }

  sendSms(message, number, scheduledTime) {

    const unixTimestamp =  Math.round(new Date(scheduledTime).getTime()/1000);

    this.http.get(`${this.serverURL}/sms/${number}/${message}/${unixTimestamp}`, {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      });
  }

}
