import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Location } from '../../_interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private loc = new BehaviorSubject<Location|null>(null);

  loc$ = this.loc.asObservable();

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.loc.next({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      });
    } else {
      console.error('location not allowed');
    }
  }
}
