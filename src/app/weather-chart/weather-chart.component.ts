import { Component, Input, OnInit } from '@angular/core';
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
    this.weatherService.getWeather().subscribe((data) => {
      
      this.name = data;
      //console.log(this.name.items[0].forecasts[0]);
    });
  }

}