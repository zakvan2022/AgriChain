import { Component, OnInit } from '@angular/core';
import { each, groupBy } from 'lodash';
import { isSameDay } from 'date-fns';
import * as moment from 'moment';
import {
  Forecast,
} from 'angular-weather-widget/services/api/weather.api.service';


import { WeatherReportService } from '../../_services';


@Component({
  selector: 'ngx-precipitation-wind',
  templateUrl: './precipitation-wind.component.html',
  styleUrls: ['./precipitation-wind.component.scss'],
})
export class PrecipitationWindComponent implements OnInit {

  public today: Date;
  public next_day: Date;

  public today_forcast: Forecast[] = [];
  public next_day_forcast: Forecast[] = [];

  constructor(private weather_data: WeatherReportService) { }

  ngOnInit() {
    this.weather_data.forecast$.subscribe((forcast) => {
      let groups = groupBy(forcast, function (item) {
        return moment(item.data).startOf('day').format();
      });

      each(groups, (value, key) => {
        let is_same_day = isSameDay(this.today, key);
        let is_next_day = isSameDay(this.next_day, key);
        if ( is_same_day ) {
          this.today_forcast = value;
        } else if ( is_next_day ) {
          this.next_day = value;
        }
      });
    });
  }

}
