import { Component, OnInit } from '@angular/core';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cdk-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    console.log("hii hai");
    return new Promise((resolve, reject) => {
        this.http.get('http://api.timezonedb.com/v2.1/list-time-zone' )
            .subscribe((response: any) => {
                console.log(response);
                 resolve(response);
              
            }, reject);

    });
}
}
