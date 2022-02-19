import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { zip } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  forecasts = [];

  datepick: NgbDateStruct;

  minDate = { year: 2016, month: 4, day: 20 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() + 4,
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.get30DaysWeather(
      new Date(new Date().setDate(new Date().getDate() + 4))
    );
  }

  get30DaysWeather(date: Date) {
    while(this.forecasts.length<30){
      this.forecasts.concat(this.forecasts,this.weatherService.getWeather(new Date(date.setDate(date.getDate() - 4))));
    }
    
    // zip(
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(
    //     new Date(date.setDate(date.getDate() - 4))
    //   ),
    //   this.weatherService.getWeather(new Date(date.setDate(date.getDate() - 4)))
    // ).subscribe(([res1, res2, res3, res4, res5, res6, res7, res8]) => {
    //   this.forecasts = (
    //     res1.items.length
    //       ? res1.items[res1.items.length - 1].forecasts.reverse()
    //       : []
    //   ).concat(
    //     res2.items.length
    //       ? res2.items[res2.items.length - 1].forecasts.reverse()
    //       : [],
    //     res3.items.length
    //       ? res3.items[res3.items.length - 1].forecasts.reverse()
    //       : [],
    //     res4.items.length
    //       ? res4.items[res4.items.length - 1].forecasts.reverse()
    //       : [],
    //     res5.items.length
    //       ? res5.items[res5.items.length - 1].forecasts.reverse()
    //       : [],
    //     res6.items.length
    //       ? res6.items[res6.items.length - 1].forecasts.reverse()
    //       : [],
    //     res7.items.length
    //       ? res7.items[res7.items.length - 1].forecasts.reverse()
    //       : [],
    //     res8.items.length
    //       ? res8.items[res8.items.length - 1].forecasts.reverse()
    //       : []
    //   );
    //   // console.log("res1");
    //   // console.log(res1);
    //   // console.log("res2");
    //   // console.log(res2);
    //   // console.log("res3");
    //   // console.log(res3);
    //   // console.log("res4");
    //   // console.log(res4);
    //   // console.log("res5");
    //   // console.log(res5);
    //   // console.log("res6");
    //   // console.log(res6);
    //   // console.log("res7");
    //   // console.log(res7);
    //   // console.log("res8");
    //   // console.log(res8);
    // });
  }

  changeDate(event: any) {
    this.get30DaysWeather(
      new Date(this.datepick.year, this.datepick.month-1, this.datepick.day+1)
    );
    console.log("new DATE");
    console.log(this.datepick.year, this.datepick.month-1, this.datepick.day);
    console.log(new Date(this.datepick.year, this.datepick.month-1, this.datepick.day+1));
  }

  clear() {
    this.forecasts = [];
  }
}
