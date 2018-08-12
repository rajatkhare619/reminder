import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
     url = 'https://onesignal.com/api/v1/notifications';

  constructor(private http: HttpClient) { }

  setNotification(message, scheduleTime) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ZGI5MTk3MjQtYmFmZi00YWM2LWJhMTEtMDUzYWMyNTM3N2Zm'
      })
    };
    const body = {
      "app_id": "5a844928-023c-4201-bb5d-d055cd760859",
      "include_player_ids": ["61be66c3-1abd-47e2-b7dd-e0054f719688"],
      "data": {"foo": "bar"},
      "contents": {"en": message},
      "send_after": scheduleTime
    };

    this.http.post(this.url, body, httpOptions)
      .subscribe(res => {
        console.log(res);
      } );
  }
}
