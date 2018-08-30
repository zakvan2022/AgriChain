import { Component } from '@angular/core';

import { ProfileList, ZonesList, BulbList } from '../../../_interface';
import { DashboardService } from '../../_services';

@Component({
  selector: 'ngx-water-control',
  templateUrl: './water-control.component.html',
  styleUrls: ['./water-control.component.scss'],
})
export class WaterControlComponent {
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
