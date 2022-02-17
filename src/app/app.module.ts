import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [AppComponent, WeatherComponent,WeatherTableComponent,WeatherChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
