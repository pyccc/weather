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
    let humidityHigh = [];
    let humidityLow = [];
    let tempHigh = [];
    let tempLow = [];

    let subtitle = '';

    if (this.chartData.length) {
      subtitle =
        this.chartData[this.chartData.length - 1].date +
        ' TO ' +
        this.chartData[0].date;
      this.chartData.forEach((value) => {
        xCat.unshift(value.date.split('-')[1] + '-' + value.date.split('-')[2]);

        tempHigh.unshift(value.temperature.high);
        tempLow.unshift(value.temperature.low);

        humidityHigh.unshift(value.relative_humidity.high);
        humidityLow.unshift(value.relative_humidity.low);
      });
    }

    Highcharts.chart({
      chart: {
        renderTo: 'humidityContainer',
        type: 'line',
      },
      title: {
        text: 'Humidity Trend',
      },
      subtitle: {
        text: subtitle,
      },
      xAxis: {
        categories: xCat,
      },
      yAxis: {
        title: {
          text: 'Humidity (%)',
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
      series: [
        {
          name: 'High',
          type: 'line',
          data: humidityHigh
        },
        {
          name: 'Low',
          type: 'line',
          data: humidityLow
        },
      ],
    });

    Highcharts.chart({
      chart: {
        renderTo: 'tempContainer',
        type: 'line',
      },
      title: {
        text: 'Temperature Trend',
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
      series: [
        {
          name: 'High',
          type: 'line',
          data: tempHigh,
          color: 'red'
        },
        {
          name: 'Low',
          type: 'line',
          data: tempLow,
          color: 'orange'
        },
      ],
    });
  }
}
