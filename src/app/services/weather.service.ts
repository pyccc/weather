import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { WeatherDataWrapper } from '../models/weather-data-wrapper';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  public getWeather(startDate: Date): Observable<WeatherDataWrapper> {
    console.log(startDate);
    return this.httpClient
      .get<WeatherDataWrapper>(
        'https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date='+startDate.toISOString().split('T')[0],
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error.message;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' +
        `HTTP ${error.status}: ${error.error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
