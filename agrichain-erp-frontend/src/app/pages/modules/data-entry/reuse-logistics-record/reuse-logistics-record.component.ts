import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import Helper from '../../../_helper';
import { LogisticsRecordService } from '../../../_services/logistics-record.service';


@Component({
  selector: 'ngx-reuse-logistics-record',
  templateUrl: './reuse-logistics-record.component.html',
  styleUrls: ['./reuse-logistics-record.component.scss'],
})
export class ReuseLogisticsRecordComponent implements OnInit {

  isEditshow: boolean = false;
  logisticRecords: any = [];
  noResultFound: boolean = false;
  items: any = [];
  itemsTwo: any = [];
  itemsThree: any = [];

  reuseLogisticsRecord: FormGroup;

  constructor(
    private _lService: LogisticsRecordService,
    private helper: Helper,
    private formBuilder: FormBuilder,
  ) {

    this.reuseLogisticsRecord = this.formBuilder.group({
      logisticsId: '',
      barcode: '',
      produceType: '',
      productionLocation: '',
      producedBy: '',
      productionTimestamp: '',
      bestBeforeTimestamp: '',
      items: this.formBuilder.array([]),
      senderName: '',
      senderId: '',
      senderLocation: '',
      packagedBy: '',
      receiverName: '',
      receiverId: '',
      receiverLocation: '',
      receivedBy: '',
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
    this.items = this.reuseLogisticsRecord.get('items') as FormArray;
    this.items.push(this.createItem(items));
  }

  removeItem(i?: number) {

    if (this.reuseLogisticsRecord.controls.items['length'] > 1) {
      this.reuseLogisticsRecord.controls.items['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseLogisticsRecord.controls.items['controls'] = [];
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
    this.itemsTwo = this.reuseLogisticsRecord.get('itemsTwo') as FormArray;
    this.itemsTwo.push(this.createItemTwo(itemsTwo));
  }
  removeItemTwo(i?: number) {
    if (this.reuseLogisticsRecord.controls.itemsTwo['length'] > 1) {
      this.reuseLogisticsRecord.controls.itemsTwo['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseLogisticsRecord.controls.itemsTwo['controls'] = [];
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
    this.itemsThree = this.reuseLogisticsRecord.get('itemsThree') as FormArray;
    this.itemsThree.push(this.createItemThree(itemsThree));
  }
  removeItemThree(i?: number) {
    if (this.reuseLogisticsRecord.controls.itemsThree['length'] > 1) {
      this.reuseLogisticsRecord.controls.itemsThree['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.reuseLogisticsRecord.controls.itemsThree['controls'] = [];
    }
  }

  ngOnInit() {
    this.getLogisticRecords();
  }

  getLogisticRecords() {
    this._lService.getLogisticsRecords().subscribe(res => {
      this.logisticRecords = res;
    });
  }

  trace(value) {

    const _logisticsExists = this.helper.filterObject(
      this.logisticRecords, ['logisticsId', 'barcode'], value,
    );

    if (_logisticsExists.length > 0) {
      this.isEditshow = true;
      this.noResultFound = false;

      this.removeItem();
      this.removeItemTwo();
      this.removeItemThree();

      this.reuseLogisticsRecord.patchValue(_logisticsExists[0]);

      for (let item of _logisticsExists[0]['items']) {
        this.addItem(item);
      }

      for (let itemsTwo of _logisticsExists[0]['itemsTwo']) {
        this.addItemTwo(itemsTwo);
      }

      for (let itemsThree of _logisticsExists[0]['itemsThree']) {
        this.addItemThree(itemsThree);
      }
    }

    if (_logisticsExists.length === 0) {
      this.noResultFound = true;
      this.isEditshow = false;
    }
  }

  LogisticsRecordData() {
    this._lService.createLogisticsRecords(this.reuseLogisticsRecord.value);
    // console.log(this.createLogisticsRecord.value);
  }

}
