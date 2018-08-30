import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { BatchRecordService } from '../../../_services/batch-record.service';


@Component({
  selector: 'ngx-edit-batch-record',
  templateUrl: './edit-batch-record.component.html',
  styleUrls: ['./edit-batch-record.component.scss'],
})
export class EditBatchRecordComponent implements OnInit {

  isEditshow: boolean = false;
  batchRecords: any = [];
  noResultFound: boolean = false;
  properties: any = [];
  constituents: any = [];
  newConstituents: any = [];

  editBatchRecord: FormGroup;

  constructor(
    private _bService: BatchRecordService,
    private formBuilder: FormBuilder) {
    this.editBatchRecord = this.formBuilder.group({
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
  // ITEMS ONE
  createProperties(items?: any): FormGroup {

    if (!items) {
      items = {
        name: '',
        value: '',
      };
    }
    return this.formBuilder.group({
      name: new FormControl(items.name),
      value: new FormControl(items.value),
    });
  }

  addProperty(items) {
    this.properties = this.editBatchRecord.get('properties') as FormArray;
    this.properties.push(this.createProperties(items));
  }

  removeProperty(i?: number) {

    if (this.editBatchRecord.controls.properties['length'] > 1) {
      this.editBatchRecord.controls.properties['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editBatchRecord.controls.properties['controls'] = [];
    }
  }

  // ITEMS TWO
  createConstituents(constituents?: any): FormGroup {
    if (!constituents) {
      constituents = {
        _id: '',
        type: '',
        company: '',
        time: '',
        location: '',
      };
    }
    return this.formBuilder.group({
      _id: new FormControl(constituents._id),
      type: new FormControl(constituents.type),
      company: new FormControl(constituents.company),
      time: new FormControl(constituents.time),
      location: new FormControl(constituents.location),
    });
  }

  addConstituent(constituents) {
    this.constituents = this.editBatchRecord.get('constituents') as FormArray;
    this.constituents.push(this.createConstituents(constituents));
  }
  removeConstituent(i?: number) {
    if (this.editBatchRecord.controls.constituents['length'] > 1) {
      this.editBatchRecord.controls.constituents['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editBatchRecord.controls.constituents['controls'] = [];
    }
  }

  // ITEMS THREE
  createNewConstituents(constituents?: any): FormGroup {
    if (!constituents) {
      constituents = {
        _id: '',
        type: '',
        company: '',
        time: '',
        location: '',
      };
    }
    return this.formBuilder.group({
      _id: new FormControl(constituents._id),
      type: new FormControl(constituents.type),
      company: new FormControl(constituents.company),
      time: new FormControl(constituents.time),
      location: new FormControl(constituents.location),
    });
  }

  addNewConstituent(constituents) {
    this.constituents = this.editBatchRecord.get('constituents') as FormArray;
    this.constituents.push(this.createNewConstituents(constituents));
  }
  removeNewConstituent(i?: number) {
    if (this.editBatchRecord.controls.constituents['length'] > 1) {
      this.editBatchRecord.controls.constituents['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editBatchRecord.controls.constituents['controls'] = [];
    }
  }

  ngOnInit() {
    this.getBatchRecords();
  }

  getBatchRecords() {
    this._bService.getBatchRecords().subscribe((res) => {
      this.batchRecords = res.data.batchRecords;
    });
  }

  async trace(value) {
    const _batchExists = this.batchRecords.filter((item) => item.batchId === value || item.barcode === value);

    if (_batchExists.length > 0) {

      this.isEditshow = true;
      this.noResultFound = false;

      this.removeProperty();
      this.removeConstituent();
      this.removeNewConstituent();

      await this._bService.getConstituents(_batchExists[0].constituents).subscribe((res) => {
        console.log(res);
        // _batchExists[0].constituents = res.data.constituents;
        console.log(_batchExists[0]);

              this.editBatchRecord.patchValue(_batchExists[0]);

              for (let item of _batchExists[0]['properties']) {
                this.addProperty(item);
              }

              for (let itemsTwo of res.data.getConstituents) {
                this.addConstituent(itemsTwo);
              }
      });

    }

    if (_batchExists.length === 0) {
      this.noResultFound = true;
      this.isEditshow = false;
    }
  }

  BatchRecordData() {
    this._bService.editBatchRecords(this.editBatchRecord.value);
  }
}
