import { Component, Input, OnInit } from '@angular/core';
import Highcharts=require('highcharts');
import { WeatherDataWrapper } from '../models/weather-data-wrapper';
import { WeatherService } from '../services/weather.service';



@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css']
})
export class WeatherChartComponent implements OnInit {

  @Input() name: WeatherDataWrapper;

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    Highcharts.chart('container', {

      title: {
          text: 'Solar Employment Growth by Sector, 2010-2016'
      },
  
      subtitle: {
          text: 'Source: thesolarfoundation.com'
      },
  
      yAxis: {
          title: {
              text: 'Number of Employees'
          }
      },
  
      xAxis: {
          accessibility: {
              rangeDescription: 'Range: 2010 to 2017'
          }
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2010
          }
      },
  
      series: [{
          name: 'Low Humidity',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
          name: 'High Humidity',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
  });
  }

}