import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  httpOptions = {
    headers: new HttpHeaders({
      // "async": "true",
      // "crossDomain": "true",
      // "hostname": "api.msg91.com",
      "authkey": "221336A6iPnzDPN05b2931c5",
      "content-type": "application/json"
    })
  };
  constructor(private http: HttpClient) { }

  sendSms(message, number, scheduledTime) {
    const url = `http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles=${number}&authkey=221336A6iPnzDPN05b2931c5&country=91&message=${message}`;

    // this.http.get(url, this.httpOptions)
    //   .subscribe(res => {
    //     console.log(res);
    //   } );
    const unixTimestamp =  Math.round(new Date(scheduledTime).getTime()/1000);

    this.http.get(`http://localhost:2000/sms/${number}/${message}/${unixTimestamp}`, {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      });
  }

  // sendSms(message, number) {
  //   const url = `http://api.msg91.com/api/v2/sendsms`;
  //   const data = {
  //     "sender": "SOCKET",
  //     "route": "4",
  //     "country": "91",
  //     "sms": [
  //       {
  //         "message": message,
  //         "to": [
  //           number,
  //         ]
  //       }
  //     ]
  //   };
  //   this.http.post(url, data, this.httpOptions)
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }
}
