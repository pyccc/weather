import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { zip } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { mainDiagnosticsForTest } from '@angular/compiler-cli/src/main';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  forecasts = [];

  date: NgbDateStruct;

  minDate = { year: 2016, month: 3, day: 20 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.get30DaysWeather(new Date());
    console.log(this.maxDate);
  }

  get30DaysWeather(date: Date) {
    zip(
      this.weatherService.getWeather(date),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() - 4))
      ),
      this.weatherService.getWeather(new Date(date.setDate(date.getDate() - 4)))
    ).subscribe(([res1, res2, res3, res4, res5, res6, res7, res8]) => {
      this.forecasts = (
        res1.items.length
          ? res1.items[res1.items.length - 1].forecasts.reverse()
          : []
      ).concat(
        res2.items.length
          ? res2.items[res2.items.length - 1].forecasts.reverse()
          : [],
        res3.items.length
          ? res3.items[res3.items.length - 1].forecasts.reverse()
          : [],
        res4.items.length
          ? res4.items[res4.items.length - 1].forecasts.reverse()
          : [],
        res5.items.length
          ? res5.items[res5.items.length - 1].forecasts.reverse()
          : [],
        res6.items.length
          ? res6.items[res6.items.length - 1].forecasts.reverse()
          : [],
        res7.items.length
          ? res7.items[res7.items.length - 1].forecasts.reverse()
          : [],
        res8.items.length
          ? res8.items[res8.items.length - 1].forecasts.reverse()
          : []
      );
    });
  }

  refresh() {
    console.log(this.forecasts);
    this.forecasts = [];
    console.log(this.forecasts);
  }
}
