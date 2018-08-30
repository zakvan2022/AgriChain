import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataEntryComponent } from './data-entry.component';
import { CreateBatchRecordComponent } from './create-batch-record/create-batch-record.component';
import { EditBatchRecordComponent } from './edit-batch-record/edit-batch-record.component';
import { ReuseBatchRecordComponent } from './reuse-batch-record/reuse-batch-record.component';
import { CreateLogisticsRecordComponent } from './create-logistics-record/create-logistics-record.component';
import { EditLogisticsRecordComponent } from './edit-logistics-record/edit-logistics-record.component';
import { ReuseLogisticsRecordComponent } from './reuse-logistics-record/reuse-logistics-record.component';



const routes: Routes = [
  { path: '', component: DataEntryComponent },
  { path: 'create-batch-record', component: CreateBatchRecordComponent },
  { path: 'edit-batch-record', component: EditBatchRecordComponent },
  { path: 'reuse-batch-record', component: ReuseBatchRecordComponent },
  { path: 'create-logistics-record', component: CreateLogisticsRecordComponent },
  { path: 'edit-logistics-record', component: EditLogisticsRecordComponent },
  { path: 'reuse-logistics-record', component: ReuseLogisticsRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataEntryRoutingModule { }
