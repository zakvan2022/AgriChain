import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataEntryRoutingModule } from './data-entry-routing.module';
import { CreateBatchRecordComponent } from './create-batch-record/create-batch-record.component';
import { DataEntryComponent } from './data-entry.component';
import { CreateLogisticsRecordComponent } from './create-logistics-record/create-logistics-record.component';
import { EditBatchRecordComponent } from './edit-batch-record/edit-batch-record.component';
import { ReuseBatchRecordComponent } from './reuse-batch-record/reuse-batch-record.component';
import { EditLogisticsRecordComponent } from './edit-logistics-record/edit-logistics-record.component';
import { ReuseLogisticsRecordComponent } from './reuse-logistics-record/reuse-logistics-record.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    DataEntryRoutingModule,
  ],
  declarations: [
    CreateBatchRecordComponent,
    DataEntryComponent,
    CreateLogisticsRecordComponent,
    EditBatchRecordComponent,
    ReuseBatchRecordComponent,
    EditLogisticsRecordComponent,
    ReuseLogisticsRecordComponent,
  ],
})
export class DataEntryModule { }
