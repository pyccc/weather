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
  lineSparklineOptions = {
    type: 'line',
    line: {
      stroke: 'rgb(124,255,178)',
      strokeWidth: 2
    },
    padding: {
      top:5,
      bottome:5
    },
    marker: {
      size: 3,
      shape: 'diamond'
    },
    highlightStyle: {
      size:10
    }
  };
  
  columnDefs = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
    { headerName: 'Forecast', field: 'forecast', filter: true },
    { headerName: 'Temperature', field: 'temperature.high', filter: true },
    {
      headerValueGetter: (params) => {
        return '[' + params.colDef.field + ']';
      },field: 'temperature.low'
    },
    {
      field:'temperatures',
      cellRenderer:'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: this.lineSparklineOptions
      }
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
      console.log(data.items[0].forecasts);
    });
    
  }
}
