import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';

import { ProduceTraceabilityRoutingModule } from './produce-traceability-routing.module';
import { ProduceTraceabilityComponent } from './produce-traceability.component';
import { BatchResultComponent } from './batch-result/batch-result.component';
import { LogisticsResultComponent } from './logistics-result/logistics-result.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule, ThemeModule,
    ProduceTraceabilityRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
    }),
    AgmDirectionModule,
  ],
  declarations: [
    ProduceTraceabilityComponent, BatchResultComponent,
    LogisticsResultComponent, MapComponent,
  ],
})
export class ProduceTraceabilityModule { }