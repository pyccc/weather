import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { zip } from 'rxjs';
import { Forecast } from '../models/forecast';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
})
export class WeatherTableComponent implements OnInit {
  @Input() rowData : Forecast[];

  columnDefs = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
    { headerName: 'Forecast', field: 'forecast', sortable: true, filter: true },
    {
      headerName: 'Temperature / °C',
      valueGetter: (params) => {
        return (
          params.data.temperature.low + '   ~   ' + params.data.temperature.high
        );
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Relative Humidity / %',
      valueGetter: (params) => {
        return (
          params.data.relative_humidity.low +
          '   ~   ' +
          params.data.relative_humidity.high
        );
      },
      sortable: true,
      filter: true,
    },
    { headerName: 'Wind Direction', field: 'wind.direction', filter: true },
    {
      headerName: 'Wind Speed / KM/h',
      valueGetter: (params) => {
        return (
          params.data.wind.speed.low + '   ~   ' + params.data.wind.speed.high
        );
      },
      sortable: true,
      filter: true,
    },

    // {
    //   headerValueGetter: (params) => {
    //     return '[' + params.colDef.field + ']';
    //   },
    //   field: 'temperature.low',
    // },
  ];

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {}
}
