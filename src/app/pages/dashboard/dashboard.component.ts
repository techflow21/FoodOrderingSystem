import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  status = false;
  addToggle() {
    this.status = !this.status;
  }
  data: any;
  constructor(private http: HttpClient) {
    //get request from web api
    this.http.get('https://therichpost.com/testjsonapi/users/').subscribe(
      (data) => {
        this.data = data;
      },
      (error) => console.error(error)
    );
  }
}
