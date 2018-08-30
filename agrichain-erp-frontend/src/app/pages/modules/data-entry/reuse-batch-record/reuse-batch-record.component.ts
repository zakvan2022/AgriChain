import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { BatchRecordService } from '../../../_services/batch-record.service';
import Helper from '../../../_helper';

@Component({
  selector: 'ngx-reuse-batch-record',
  templateUrl: './reuse-batch-record.component.html',
  styleUrls: ['./reuse-batch-record.component.scss'],
})
export class ReuseBatchRecordComponent implements OnInit {

  isReuseShow: boolean = false;
  batchRecords: any = [];
  noResultFound: boolean = false;
  items: any = [];
  itemsTwo: any = [];
  itemsThree: any = [];

  reuseBatchRecord: FormGroup;

  constructor(
    private _bService: BatchRecordService,
    private helper: Helper,
    private formBuilder: FormBuilder,
  ) {
    this.reuseBatchRecord = this.formBuilder.group({
      id: '',
      batchId: '',
      barcode: '',
      produceType: '',
      productionLocation: '',
      producedBy: '',
      productionTimestamp: '',
      batchBestTimestamp: '',
      items: this.formBuilder.array([]),
      itemsTwo: this.formBuilder.array([]),
      itemsThree: this.formBuilder.array([]),
      comment: '',
    });
  }

  // ITEMS ONE
  createItem(items?: any): FormGroup {

    if (!items) {
      items = {
        temperature: '',
        temperatureUnit: '',
      };
    }
    return this.formBuilder.group({
      temperature: new FormControl(items.temperature),
      temperatureUnit: new FormControl(items.temperatureUnit),
    });
  }

  addItem(items) {
    this.items = this.reuseBatchRecord.get('items') as FormArray;
    this.items.push(this.createItem(items));
  }

  removeItem(i?: number) {

    if (this.reuseBatchRecord.controls.items['length'] > 1) {
      this.reuseBatchRecord.controls.items['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseBatchRecord.controls.items['controls'] = [];
    }
  }

  // ITEMS TWO
  createItemTwo(itemsTwo?: any): FormGroup {
    if (!itemsTwo) {
      itemsTwo = {
        constituentsId: '',
        constituentsType: '',
        constituentsCompany: '',
        constituentsTime: '',
        constituentsBarcodeId: '',
      };
    }
    return this.formBuilder.group({
      constituentsId: new FormControl(itemsTwo.constituentsId),
      constituentsType: new FormControl(itemsTwo.constituentsType),
      constituentsCompany: new FormControl(itemsTwo.constituentsType),
      constituentsTime: new FormControl(itemsTwo.constituentsType),
      constituentsBarcodeId: new FormControl(itemsTwo.constituentsType),
    });
  }

  addItemTwo(itemsTwo) {
    this.itemsTwo = this.reuseBatchRecord.get('itemsTwo') as FormArray;
    this.itemsTwo.push(this.createItemTwo(itemsTwo));
  }
  removeItemTwo(i?: number) {
    if (this.reuseBatchRecord.controls.itemsTwo['length'] > 1) {
      this.reuseBatchRecord.controls.itemsTwo['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseBatchRecord.controls.itemsTwo['controls'] = [];
    }
  }

  // ITEMS THREE
  createItemThree(itemsThree): FormGroup {

    if (!itemsThree) {
      itemsThree = {
        unavailableConstituentsId: '',
        unavailableConstituentsType: '',
        unavailableConstituentsCompany: '',
        unavailableConstituentsTime: '',
        unavailableConstituentsLocation: '',
      };
    }
    return this.formBuilder.group({
      unavailableConstituentsId: new FormControl(itemsThree.unavailableConstituentsId),
      unavailableConstituentsType: new FormControl(itemsThree.unavailableConstituentsType),
      unavailableConstituentsCompany: new FormControl(itemsThree.unavailableConstituentsCompany),
      unavailableConstituentsTime: new FormControl(itemsThree.unavailableConstituentsTime),
      unavailableConstituentsLocation: new FormControl(itemsThree.unavailableConstituentsLocation),
    });


  }

  addItemThree(itemsThree) {
    this.itemsThree = this.reuseBatchRecord.get('itemsThree') as FormArray;
    this.itemsThree.push(this.createItemThree(itemsThree));
  }
  removeItemThree(i?: number) {
    if (this.reuseBatchRecord.controls.itemsThree['length'] > 1) {
      this.reuseBatchRecord.controls.itemsThree['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseBatchRecord.controls.itemsThree['controls'] = [];
    }
  }

  ngOnInit() {
    this.getBatchRecords();
  }

  getBatchRecords() {
    this._bService.getBatchRecords().subscribe(res => {
      this.batchRecords = res;
    });
  }

  trace(value) {

    const _batchExists = this.helper.filterObject(
      this.batchRecords, ['batchId', 'barcode'], value,
    );

    if (_batchExists.length > 0) {
      this.isReuseShow = true;
      this.noResultFound = false;

      this.removeItem();
      this.removeItemTwo();
      this.removeItemThree();

      this.reuseBatchRecord.patchValue(_batchExists[0]);

      for (let item of _batchExists[0]['items']) {
        this.addItem(item);
      }

      for (let itemsTwo of _batchExists[0]['itemsTwo']) {
        this.addItemTwo(itemsTwo);
      }

      for (let itemsThree of _batchExists[0]['itemsThree']) {
        this.addItemThree(itemsThree);
      }
    }

    if (_batchExists.length === 0) {
      this.noResultFound = true;
      this.isReuseShow = false;
    }
  }

  BatchRecordData() {
    this._bService.createBatchRecords(this.reuseBatchRecord.value);
    // console.log(this.createBatchRecord.value);
  }

}
