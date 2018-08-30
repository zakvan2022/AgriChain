import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { SimpleTimer } from 'ng2-simple-timer';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { DraggerContainerComponent } from './dragger-container/dragger-container.component';
import { TemperatureDraggerComponent } from './temperature-dragger/temperature-dragger.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';

import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';

import { LiveFarmStaticsComponent } from './live-farm-statics/live-farm-statics.component';
import { ToDoComponent } from './to-do/to-do.component';
import { LightControlComponent } from './light-control/light-control.component';

// services
import { WeatherReportService, LocationService, DashboardService } from '../_services';

import { SensorHealthComponent } from './sensor-health/sensor-health.component';
import { TimerComponent } from './timer/timer.component';
import { SoilMoistureAnalysisComponent } from './soil-moisture-analysis/soil-moisture-analysis.component';
import { WaterControlComponent } from './water-control/water-control.component';
import { AirSunComponent } from './air-sun/air-sun.component';
import { PrecipitationWindComponent } from './precipitation-wind/precipitation-wind.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { PrecipitationWindSpeedComponent } from './precipitation-wind-speed/precipitation-wind-speed.component';
import { WeatherForcastChartComponent } from './weather-forcast-chart/weather-forcast-chart.component';

@NgModule({
  imports: [
    ThemeModule,

    NgxEchartsModule,
    ChartModule,

    AngularWeatherWidgetModule.forRoot({
      key: '82348afede06d04e58414394f9968e93',
      name: WeatherApiName.OPEN_WEATHER_MAP,
      baseUrl: 'http://api.openweathermap.org/data/2.5',
    }),
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    TrafficComponent,
    TrafficChartComponent,
    LiveFarmStaticsComponent,
    ToDoComponent,
    SensorHealthComponent,
    LightControlComponent,
    DraggerContainerComponent,
    TimerComponent,
    SoilMoistureAnalysisComponent,
    WaterControlComponent,
    AirSunComponent,
    PrecipitationWindComponent,
    PrecipitationComponent,
    PrecipitationWindSpeedComponent,
    WeatherForcastChartComponent,
  ],
  providers: [
    WeatherReportService,
    LocationService,
    DashboardService,
    SimpleTimer,
  ],
})
export class DashboardModule { }
