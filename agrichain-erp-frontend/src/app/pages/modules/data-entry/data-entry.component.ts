import { Component, OnInit } from '@angular/core';
import { DataEntryService } from '../../_services/data-entry.service';
@Component({
  selector: 'ngx-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss'],
})
export class DataEntryComponent implements OnInit {
  forms: any;
  constructor(private _service: DataEntryService) { }

  getDataEntryForms() {
    this._service.getDataEntryForms().subscribe(res => {
      this.forms = res;
    });
  }

  ngOnInit() {
    this.getDataEntryForms();
  }
}
