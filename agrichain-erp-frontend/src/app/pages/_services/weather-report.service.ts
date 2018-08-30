import {
  Injectable,
} from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import {
  CurrentWeather,
  Forecast,
  WeatherApiService,
} from 'angular-weather-widget/services/api/weather.api.service';
import {
  WeatherQueryParams,
  WeatherSettings,
} from 'angular-weather-widget/weather.interfaces';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherReportService {
  subscriptionCurrentWeather: Subscription;
  subscriptionForecast: Subscription;

  // P = package related variables
  private pcurrentWeather$: Observable<CurrentWeather>;
  private pforecast$: Observable<Forecast[]>;

  private currentWeather  = new BehaviorSubject<CurrentWeather|null>(null);
  private forecast        = new BehaviorSubject<Forecast[]|null>(null);
  currentWeather$ = this.currentWeather.asObservable();
  forecast$       = this.forecast.asObservable();

  private _settings: WeatherSettings;

  constructor(private weatherApi: WeatherApiService, private http: Http) { }

  settings(value: WeatherSettings) {
    if (!value) {
      return;
    }
    this._settings = value;
    if (this.weatherApi.apiConfig.name && this.weatherApi.apiConfig.key) {
      this.getWeather();
    }
  }

  getWeather(): void {
    if (this.subscriptionCurrentWeather) {
      this.subscriptionCurrentWeather.unsubscribe();
    }
    if (this.subscriptionForecast) {
      this.subscriptionForecast.unsubscribe();
    }

    this.pcurrentWeather$ = this.currentWeatherCall();
    this.pforecast$       = this.forecastCall();

    this.subscriptionCurrentWeather = this.pcurrentWeather$.subscribe(data => {
      this.currentWeather.next(data);
    });
    this.subscriptionForecast = this.pforecast$.subscribe(data => {
      this.forecast.next(data);
    });
    // this.currentWeather.next(JSON.parse('{"temp":40.8,"pressure":976,"humidity":30,"minTemp":40.8,"maxTemp":40.8,"sunrise":1528761160,"sunset":1528812023,"location":"Ludhiana","iconUrl":"http://openweathermap.org/img/w/01d.png","iconClass":"wi wi-day-sunny","description":"clear sky","wind":{"deg":287.501,"speed":1.41}}'));

    // this.forecast.next(JSON.parse('[{"temp":45.71,"pressure":976,"humidity":30,"minTemp":40.8,"maxTemp":45.71,"location":"Ludhiana","iconClass":"wi wi-day-rain","description":"light rain","data":"2018-06-12T12:00:00.000Z","wind":{"deg":287.501,"speed":1.41}},{"temp":37.9,"pressure":976.91,"humidity":37,"minTemp":34.22,"maxTemp":37.9,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-12T15:00:00.000Z","wind":{"deg":10.5021,"speed":2.11}},{"temp":31.33,"pressure":977.63,"humidity":66,"minTemp":28.88,"maxTemp":31.33,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-12T18:00:00.000Z","wind":{"deg":149.001,"speed":0.86}},{"temp":27.87,"pressure":976.94,"humidity":72,"minTemp":26.65,"maxTemp":27.87,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-12T21:00:00.000Z","wind":{"deg":56.5047,"speed":0.7}},{"temp":25.28,"pressure":977.27,"humidity":76,"minTemp":25.28,"maxTemp":25.28,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T00:00:00.000Z","wind":{"deg":68.0052,"speed":1.26}},{"temp":35.69,"pressure":978.36,"humidity":37,"minTemp":35.69,"maxTemp":35.69,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T03:00:00.000Z","wind":{"deg":83.5001,"speed":2.11}},{"temp":41.85,"pressure":977.82,"humidity":31,"minTemp":41.85,"maxTemp":41.85,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T06:00:00.000Z","wind":{"deg":222.502,"speed":2.61}},{"temp":43.71,"pressure":975.74,"humidity":23,"minTemp":43.71,"maxTemp":43.71,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T09:00:00.000Z","wind":{"deg":273.003,"speed":4.57}},{"temp":42.8,"pressure":975.01,"humidity":19,"minTemp":42.8,"maxTemp":42.8,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T12:00:00.000Z","wind":{"deg":276.001,"speed":4.91}},{"temp":36.34,"pressure":976.11,"humidity":24,"minTemp":36.34,"maxTemp":36.34,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T15:00:00.000Z","wind":{"deg":253.501,"speed":4.06}},{"temp":32.88,"pressure":977.16,"humidity":32,"minTemp":32.88,"maxTemp":32.88,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T18:00:00.000Z","wind":{"deg":249.501,"speed":4.51}},{"temp":29.6,"pressure":976.83,"humidity":47,"minTemp":29.6,"maxTemp":29.6,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-13T21:00:00.000Z","wind":{"deg":260.002,"speed":2.12}},{"temp":26.15,"pressure":977.95,"humidity":65,"minTemp":26.15,"maxTemp":26.15,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T00:00:00.000Z","wind":{"deg":132.507,"speed":0.96}},{"temp":35.46,"pressure":979.51,"humidity":32,"minTemp":35.46,"maxTemp":35.46,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T03:00:00.000Z","wind":{"deg":240.504,"speed":3.02}},{"temp":41.34,"pressure":979.16,"humidity":27,"minTemp":41.34,"maxTemp":41.34,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T06:00:00.000Z","wind":{"deg":265.501,"speed":4.82}},{"temp":43.79,"pressure":977.31,"humidity":22,"minTemp":43.79,"maxTemp":43.79,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T09:00:00.000Z","wind":{"deg":265.002,"speed":5.71}},{"temp":42.82,"pressure":976.44,"humidity":18,"minTemp":42.82,"maxTemp":42.82,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T12:00:00.000Z","wind":{"deg":265.5,"speed":5.57}},{"temp":36.05,"pressure":977.77,"humidity":26,"minTemp":36.05,"maxTemp":36.05,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T15:00:00.000Z","wind":{"deg":248.001,"speed":4.31}},{"temp":31.64,"pressure":978.69,"humidity":40,"minTemp":31.64,"maxTemp":31.64,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T18:00:00.000Z","wind":{"deg":251.501,"speed":3.91}},{"temp":28.75,"pressure":978.29,"humidity":52,"minTemp":28.75,"maxTemp":28.75,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-14T21:00:00.000Z","wind":{"deg":242.5,"speed":2.1}},{"temp":26.85,"pressure":979.5,"humidity":62,"minTemp":26.85,"maxTemp":26.85,"location":"Ludhiana","iconClass":"wi wi-day-cloudy","description":"scattered clouds","data":"2018-06-15T00:00:00.000Z","wind":{"deg":117,"speed":1.51}},{"temp":35.85,"pressure":980.91,"humidity":32,"minTemp":35.85,"maxTemp":35.85,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T03:00:00.000Z","wind":{"deg":201.5,"speed":2.67}},{"temp":40.34,"pressure":980.93,"humidity":28,"minTemp":40.34,"maxTemp":40.34,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T06:00:00.000Z","wind":{"deg":249.504,"speed":4.22}},{"temp":42.85,"pressure":979.35,"humidity":24,"minTemp":42.85,"maxTemp":42.85,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T09:00:00.000Z","wind":{"deg":238.003,"speed":4.67}},{"temp":41.99,"pressure":978.8,"humidity":21,"minTemp":41.99,"maxTemp":41.99,"location":"Ludhiana","iconClass":"wi wi-day-cloudy","description":"few clouds","data":"2018-06-15T12:00:00.000Z","wind":{"deg":237.505,"speed":5.45}},{"temp":35.3,"pressure":980.1,"humidity":33,"minTemp":35.3,"maxTemp":35.3,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T15:00:00.000Z","wind":{"deg":230.003,"speed":2.47}},{"temp":30.13,"pressure":981.43,"humidity":65,"minTemp":30.13,"maxTemp":30.13,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T18:00:00.000Z","wind":{"deg":251.504,"speed":0.96}},{"temp":28.95,"pressure":981.17,"humidity":53,"minTemp":28.95,"maxTemp":28.95,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-15T21:00:00.000Z","wind":{"deg":103.004,"speed":1.86}},{"temp":27.48,"pressure":981.71,"humidity":63,"minTemp":27.48,"maxTemp":27.48,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T00:00:00.000Z","wind":{"deg":104.002,"speed":1.37}},{"temp":36.48,"pressure":983.49,"humidity":30,"minTemp":36.48,"maxTemp":36.48,"location":"Ludhiana","iconClass":"wi wi-day-cloudy","description":"few clouds","data":"2018-06-16T03:00:00.000Z","wind":{"deg":169,"speed":1.96}},{"temp":40.41,"pressure":983.16,"humidity":28,"minTemp":40.41,"maxTemp":40.41,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T06:00:00.000Z","wind":{"deg":240.501,"speed":4.97}},{"temp":42.34,"pressure":981.39,"humidity":26,"minTemp":42.34,"maxTemp":42.34,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T09:00:00.000Z","wind":{"deg":221.004,"speed":4.41}},{"temp":41.95,"pressure":980.11,"humidity":23,"minTemp":41.95,"maxTemp":41.95,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T12:00:00.000Z","wind":{"deg":230,"speed":4.81}},{"temp":35.37,"pressure":981,"humidity":33,"minTemp":35.37,"maxTemp":35.37,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T15:00:00.000Z","wind":{"deg":235.501,"speed":2.52}},{"temp":30.27,"pressure":982.03,"humidity":61,"minTemp":30.27,"maxTemp":30.27,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T18:00:00.000Z","wind":{"deg":247,"speed":1.57}},{"temp":28.21,"pressure":981.13,"humidity":67,"minTemp":28.21,"maxTemp":28.21,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-16T21:00:00.000Z","wind":{"deg":213.005,"speed":0.88}},{"temp":27.69,"pressure":981.29,"humidity":53,"minTemp":27.69,"maxTemp":27.69,"location":"Ludhiana","iconClass":"wi wi-day-cloudy","description":"few clouds","data":"2018-06-17T00:00:00.000Z","wind":{"deg":87.5017,"speed":2.43}},{"temp":36.98,"pressure":982.62,"humidity":31,"minTemp":36.98,"maxTemp":36.98,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-17T03:00:00.000Z","wind":{"deg":143.001,"speed":2.66}},{"temp":40.78,"pressure":982.23,"humidity":29,"minTemp":40.78,"maxTemp":40.78,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-17T06:00:00.000Z","wind":{"deg":236.002,"speed":3.92}},{"temp":42.65,"pressure":980.59,"humidity":25,"minTemp":42.65,"maxTemp":42.65,"location":"Ludhiana","iconClass":"wi wi-day-sunny","description":"clear sky","data":"2018-06-17T09:00:00.000Z","wind":{"deg":234.5,"speed":4.56}}]'));
  }

  private currentWeatherCall(): Observable<CurrentWeather> {
    const params: WeatherQueryParams = Object.assign(
      {},
      this._settings.location,
      { units: this._settings.scale },
      { lang: this._settings.language },
    );
    return this.weatherApi.currentWeather(params);
  }

  private forecastCall(): Observable<Forecast[]> {
    const params: WeatherQueryParams = Object.assign(
      {},
      this._settings.location,
      { units: this._settings.scale },
      { lang: this._settings.language },
    );
    return this.weatherApi.forecast(params);
  }

  get_air_quality() {
    return this.http.get('https://breezometer.com/air-quality-api/');
  }
}
