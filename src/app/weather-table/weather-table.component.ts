import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../models/forecast';
import { WeatherDataWrapper } from '../models/weather-data-wrapper';
import { WeatherService } from '../services/weather.service';
import { forkJoin, zip } from 'rxjs';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
})
export class WeatherTableComponent implements OnInit {
  //User can do sorting by date and filter by any field
  columnDefs = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
    { headerName: 'Forecast', field: 'forecast', filter: true },
    {
      headerName: 'Temperature',
      valueGetter: (params) => {
        return (
          params.data.temperature.low + '   ~   ' + params.data.temperature.high
        );
      },
      filter: true,
    },
    {
      headerName: 'Relative Humidity',
      valueGetter: (params) => {
        return (
          params.data.relative_humidity.low +
          '   ~   ' +
          params.data.relative_humidity.high
        );
      },
      filter: true,
    },
    { headerName: 'Wind Direction', field: 'wind.direction', filter: true },
    {
      headerName: 'Wind Speed',
      valueGetter: (params) => {
        return (
          params.data.wind.speed.low + '   ~   ' + params.data.wind.speed.high
        );
      },
      filter: true,
    },

    {
      headerValueGetter: (params) => {
        return '[' + params.colDef.field + ']';
      },
      field: 'temperature.low',
    },
  ];

  rowData = [];

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    let date = new Date(new Date().getDate()-40);
    zip(
      this.weatherService.getWeather(date),
      this.weatherService.getWeather(
        new Date(date.setDate(date.getDate() + 4))
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
      this.weatherService.getWeather(new Date(date.setDate(date.getDate())))
    ).subscribe(([res1, res2]) => {
      console.log(res1);
      console.log(res2);
      this.rowData = res1.items[res1.items.length - 1].forecasts.concat(
        res2.items[res2.items.length - 1].forecasts
      );
    });
    //this.rowData = this.get30DaysWeather(new Date());
    // this.weatherService.getWeather(new Date("2020-03-16")).subscribe((data) => {
    //   //only use the data with newest timestamp
    //   this.rowData = data.items[data.items.length-1].forecasts;
    //   this.weatherService.getWeather(new Date("2021-03-15")).subscribe((data)=>{
    //     this.rowData.push(...data.items[data.items.length-1].forecasts);
    //     console.log(this.rowData);
    //   })
    //   // this.rowData.forEach((value)=>{
    //   //   value.temperatures.push(value.temperature.high);
    //   //   value.temperatures.push(value.temperature.low);
    //   // });
    //   console.log(data);
    // });
  }

  public get30DaysWeather(startDate: Date): Forecast[] {
    let result = [];

    for (let i = 0; i <= 7; i++) {
      this.weatherService.getWeather(startDate);
      i === 7
        ? startDate.setDate(startDate.getDate() + 4)
        : startDate.setDate(startDate.getDate() + 2);
    }

    return result;
  }
}
