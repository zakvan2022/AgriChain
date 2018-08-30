import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { ModulesRoutingModule } from './modules-routing.module';

@NgModule({
  imports: [
    CommonModule, ThemeModule,
    ModulesRoutingModule,
  ],
  declarations: [],
})
export class ModulesModule { }
