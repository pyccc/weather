import { Component, Input } from '@angular/core';
import { WeatherDataWrapper } from './models/weather-data-wrapper';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'weather',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class WeatherComponent {
  @Input() name: WeatherDataWrapper;

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe((data) => {
      console.log(data);
      this.name = data;
    });
  }
}
