import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BatchRecordService } from '../../../_services/batch-record.service';


@Component({
  selector: 'ngx-batch-record',
  templateUrl: './create-batch-record.component.html',
  styleUrls: ['./create-batch-record.component.scss'],
})
export class CreateBatchRecordComponent implements OnInit {
  createBatchRecord: FormGroup;
  properties: any = [];
  constituents: any = [];
  newConstituents: any = [];
  constructor(private formBuilder: FormBuilder, private _batchservice: BatchRecordService) { }
  ngOnInit() {
    this.createBatchRecord = this.formBuilder.group({
      batchId: '',
      barcode: '',
      produceType: '',
      productionLocation: '',
      producedBy: '',
      productionTimestamp: '',
      batchBestTimestamp: '',
      properties: this.formBuilder.array([this.createProperties()]),
      constituents: this.formBuilder.array([this.createConstituents()]),
      newConstituents: this.formBuilder.array([this.createNewConstituents()]),
      metadata: '',
    });
  }
  // Properties
  createProperties(): FormGroup {
    return this.formBuilder.group({
      name: '',
      value: '',
    });
  }
  addProperty() {
    this.properties = this.createBatchRecord.get('properties') as FormArray;
    this.properties.push(this.createProperties());
  }
  removeProperty(i) {
    if (this.createBatchRecord.controls.properties['length'] > 1) {
      this.createBatchRecord.controls.properties['controls'].splice(i, 1);
    }
  }
  // Constituents
  createConstituents(): FormGroup {
    return this.formBuilder.group({
      id: '',
      type: '',
      company: '',
      time: '',
      location: '',
    });
  }
  addConstituent() {
    this.constituents = this.createBatchRecord.get('constituents') as FormArray;
    this.constituents.push(this.createConstituents());
  }
  removeConstituent(i) {
    if (this.createBatchRecord.controls.constituents['length'] > 1) {
      this.createBatchRecord.controls.constituents['controls'].splice(i, 1);
    }
  }
  // New Constituent
  createNewConstituents(): FormGroup {
    return this.formBuilder.group({
      id: '',
      type: '',
      company: '',
      time: '',
      location: '',
    });
  }
  addNewConstituent() {
    this.newConstituents = this.createBatchRecord.get('newConstituents') as FormArray;
    this.newConstituents.push(this.createNewConstituents());
  }
  removeNewConstituent(i) {
    if (this.createBatchRecord.controls.newConstituents['length'] > 1) {
      this.createBatchRecord.controls.newConstituents['controls'].splice(i, 1);
    }
  }
  BatchRecordData() {
    this._batchservice.createBatchRecords(this.createBatchRecord.value);
    // console.log(this.createBatchRecord.value);
  }
}
