import { Component } from '@angular/core';

import {
  CurrentWeather,
  Forecast,
} from 'angular-weather-widget/services/api/weather.api.service';
import { format, isSameDay, addDays } from 'date-fns';
import { each, groupBy } from 'lodash';
import * as moment from 'moment';

import { WeatherReportService } from '../../_services';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent {
  public weather: CurrentWeather;

  public today_forcast: Forecast[] = [];
  public next_day_forcast: Forecast[] = [];

  public date: string;

  public today: Date;
  public next_day: Date;

  options: any = {};
  themeSubscription: any;

  constructor (
    private weather_data: WeatherReportService,
  ) {
    this.date_settings();

    // subscription to get weather and location data
    this.weather_data.currentWeather$.subscribe((weather: CurrentWeather) => {
      this.weather = weather;
    });
    this.weather_data.forecast$.subscribe((forcast) => {
      let groups = groupBy(forcast, function (item) {
        return moment(item.data).startOf('day').format();
      });
      // console.log('groups', groups);

      each(groups, (value, key) => {
        let is_same_day = isSameDay(this.today, key);
        let is_next_day = isSameDay(this.next_day, key);
        if ( is_same_day ) {
          this.today_forcast = value;
        } else if ( is_next_day ) {
          this.next_day_forcast = value;
        }
      });
    });
  }

  date_settings() {
    this.today = new Date();
    this.date = format(
      this.today,
      'ddd DD MMM',
    );
    this.next_day = addDays(this.today, 1);
  }

  get_date_day(date: Date) {
    return format(
      date,
      'ddd',
    );
  }

}
