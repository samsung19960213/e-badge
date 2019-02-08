import { Component, OnInit } from '@angular/core';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cdk-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
weather:any;
imgIcon="http://openweathermap.org/img/w/"
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    console.log("hii hai");
    return new Promise((resolve, reject) => {
        this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Bangalore,in&APPID=4ed847cf10eac68f614521ee462863c1' )
            .subscribe((response: any) => {
                console.log(response);
                this.weather= response
                this.weather.main.temp= this.weather.main.temp-273.15;
               this.imgIcon= this.imgIcon.concat(this.weather.weather[0].icon);
               this.imgIcon = this.imgIcon.concat(".png");
                console.log(this.imgIcon);
                 resolve(response);
              
            }, reject);

    });
}
}
