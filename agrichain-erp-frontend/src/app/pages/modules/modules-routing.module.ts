import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-entry',
    loadChildren: './data-entry/data-entry.module#DataEntryModule',
  },
  {
    path: 'produce-traceability',
    loadChildren: './produce-traceability/produce-traceability.module#ProduceTraceabilityModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
