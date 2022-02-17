import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../models/forecast';
import { WeatherDataWrapper } from '../models/weather-data-wrapper';
import { WeatherService } from '../services/weather.service';

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
    { headerName: 'Temperature', valueGetter: (params) => {
      return params.data.temperature.low + '   ~   ' + params.data.temperature.high
    }, filter: true },
    { headerName: 'Relative Humidity', valueGetter: (params) => {
      return params.data.relative_humidity.low + '   ~   ' + params.data.relative_humidity.high
    }, filter: true },
    { headerName: 'Wind Direction', field: 'wind.direction', filter: true },
    { headerName: 'Wind Speed', valueGetter: (params) => {
      return params.data.wind.speed.low + '   ~   ' + params.data.wind.speed.high
    }, filter: true },
    
    {
      headerValueGetter: (params) => {
        return '[' + params.colDef.field + ']';
      },field: 'temperature.low'
    }
  ];

  

  @Input() rowData: Forecast[];

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe((data) => {
      this.rowData = data.items[0].forecasts;
      // this.rowData.forEach((value)=>{
      //   value.temperatures.push(value.temperature.high);
      //   value.temperatures.push(value.temperature.low);
      // });
      console.log(data);
    });
    
  }
}
