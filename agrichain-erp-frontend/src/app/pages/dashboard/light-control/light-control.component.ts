import { Component } from '@angular/core';

import { ProfileList, ZonesList, BulbList } from '../../../_interface';
import { DashboardService } from '../../_services';

@Component({
  selector: 'ngx-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.scss'],
})
export class LightControlComponent {
  profile: ProfileList;
  zones: ZonesList;
  bulb: BulbList;


  constructor(private dashboard_service: DashboardService) {
    this.get_dropdown();
  }

  get_dropdown() {
    this.dashboard_service.profile_list$.subscribe((res) => {
      this.profile = res;
    });
    this.dashboard_service.zones_list$.subscribe((res) => {
      this.zones = res;
    });
    this.dashboard_service.bulb_list$.subscribe((res) => {
      this.bulb = res;
    });
  }
}
