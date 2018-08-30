import { Component, OnInit } from '@angular/core';

import { DashboardService, WeatherReportService, LocationService } from '../_services';
import { WeatherSettings, TemperatureScale } from 'angular-weather-widget/weather.interfaces';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboard_service: DashboardService,
    private location: LocationService,
    private weather_data: WeatherReportService,
  ) { }

  ngOnInit() {
    this.dashboard_service.get_profile_list();
    this.dashboard_service.get_zones_list();
    this.dashboard_service.get_bulb_list();

    // initialization of weather service on the basis of location
    this.location.loc$.subscribe((loc) => {
      // console.log('loc', loc);
      if ( loc != null ) {
        const settings: WeatherSettings = {
          location: {
            latLng: {
              lat: loc.lat,
              lng: loc.long,
            },
          },
          scale: TemperatureScale.CELCIUS,
        };
        this.weather_data.settings(settings);
      }
    });
  }
}
