import { Forecast } from "./forecast";

export interface WeatherDataWrapper {
  items: [
    // {
    //   timestamp: Date;
    //   update_timestamp: Date;
    //   forecasts: Forecast[];
    // }
  ];
  api_info: {
    status: string;
  };
}