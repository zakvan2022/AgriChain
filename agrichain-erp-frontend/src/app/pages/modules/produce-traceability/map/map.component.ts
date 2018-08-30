import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-map-trace',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lat: Number = 37.7699298;
  lng: Number = -122.4469157;
  zoom: Number = 14;
  dir = undefined;
  way: any;
  constructor() { }
  ngOnInit() {
    this.dir = {
      origin: { lat: 51.5050097, lng: 7.4598255 },
      destination: { lat: 51.495563, lng: 7.371229 },
    };
    this.way = [
      { location: { lat: 51.48113, lng: 7.406491 }, stopover: true },
    ];
  }
  options = {
    draggable: false,
    polylineOptions: {
      strokeColor: 'green',
      strokeWeight: 5,
      strokeDashArray: 4,
      strokeOpacity: .70,
    },
  };
}
