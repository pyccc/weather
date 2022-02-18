import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Highcharts = require('highcharts');
import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css'],
})
export class WeatherChartComponent implements OnChanges {
  @Input() chartData: Forecast[];

  constructor(public weatherService: WeatherService) {}

  ngOnChanges() {
      
    console.log(this.chartData);

    let xCat = [];
    let tempSeries = [{
        name: 'High',
        data: [],
      },
      {
        name: 'Low',
        data: [],
      }];
      let subtitle = "";

      while(this.chartData!=[]){
        subtitle = this.chartData[this.chartData.length-1].date + " TO " + this.chartData[0].date;
        this.chartData.forEach((value) => {
          xCat.unshift(value.date);
          tempSeries[0].data.unshift(value.temperature.high);
          tempSeries[1].data.unshift(value.temperature.low);
        });
      }
    

    Highcharts.chart('container', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Temperature Chart',
      },
      subtitle: {
        text: subtitle,
      },
      xAxis: {
        categories: xCat,
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: true,
        },
      },
      series: tempSeries
    });
  }

}
