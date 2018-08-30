import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduceTraceabilityComponent } from './produce-traceability.component';

const routes: Routes = [
  { path: '', component: ProduceTraceabilityComponent },
  { path: 'produce-traceability', component: ProduceTraceabilityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduceTraceabilityRoutingModule { }
