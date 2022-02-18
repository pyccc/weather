import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Forecast } from '../models/forecast';
import { FirstDataRenderedEvent, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
})
export class WeatherTableComponent implements OnInit {
  @Input() rowData : Forecast[];

  private gridApi!: GridApi;

  columnDefs = [
    { headerName: 'Date', width: 150,field: 'date', sortable: true, filter: true ,resizable: true},
    { headerName: 'Forecast', field: 'forecast', tooltipField: 'forecast',sortable: true, filter: true,resizable: true },
    {
      headerName: 'Temperature / °C',
      valueGetter: (params) => {
        return (
          params.data.temperature.low + '   ~   ' + params.data.temperature.high
        );
      },
      sortable: true,
      filter: true,
      resizable: true
    },
    {
      headerName: 'Humidity / %',
      valueGetter: (params) => {
        return (
          params.data.relative_humidity.low +
          '   ~   ' +
          params.data.relative_humidity.high
        );
      },
      sortable: true,
      filter: true,
      resizable: true
    },
    { headerName: 'Wind Direction', field: 'wind.direction', sortable: true, filter: true,resizable: true },
    {
      headerName: 'Wind Speed / KM/h',
      valueGetter: (params) => {
        return (
          params.data.wind.speed.low + '   ~   ' + params.data.wind.speed.high
        );
      },
      sortable: true,
      filter: true,
      resizable: true
    },

    // {
    //   headerValueGetter: (params) => {
    //     return '[' + params.colDef.field + ']';
    //   },
    //   field: 'temperature.low',
    // },
  ];

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.gridApi.sizeColumnsToFit();
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
}
