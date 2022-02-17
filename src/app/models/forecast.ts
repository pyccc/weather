export class Forecast {
  date: Date;
  timestamp: Date;
  forecast: string;
  temperature: {
    low: number;
    high: number;
  };
  relative_humidity: {
    low: number;
    high: number;
  };
  wind: {
    direction: string;
    speed: {
      low: number;
      high: number;
    };
  };
}
