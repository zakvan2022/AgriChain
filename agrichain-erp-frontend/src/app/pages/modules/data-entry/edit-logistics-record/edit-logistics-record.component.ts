import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import Helper from '../../../_helper';
import { LogisticsRecordService } from '../../../_services/logistics-record.service';


@Component({
  selector: 'ngx-edit-logistics-record',
  templateUrl: './edit-logistics-record.component.html',
  styleUrls: ['./edit-logistics-record.component.scss'],
})
export class EditLogisticsRecordComponent implements OnInit {

  isEditshow: boolean = false;
  logisticRecords: any = [];
  noResultFound: boolean = false;
  items: any = [];
  itemsTwo: any = [];
  itemsThree: any = [];

  editLogisticsRecord: FormGroup;

  constructor(
    private _lService: LogisticsRecordService,
    private helper: Helper,
    private formBuilder: FormBuilder) {
    this.editLogisticsRecord = this.formBuilder.group({
      id: '',
      logisticsId: '',
      barcode: '',
      produceType: '',
      productionLocation: '',
      producedBy: '',
      productionTimestamp: '',
      bestBeforeTimestamp: '',
      items: this.formBuilder.array([this.createItem()]),
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
    this.items = this.editLogisticsRecord.get('items') as FormArray;
    this.items.push(this.createItem(items));
  }

  removeItem(i?: number) {

    if (this.editLogisticsRecord.controls.items['length'] > 1) {
      this.editLogisticsRecord.controls.items['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editLogisticsRecord.controls.items['controls'] = [];
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
    this.itemsTwo = this.editLogisticsRecord.get('itemsTwo') as FormArray;
    this.itemsTwo.push(this.createItemTwo(itemsTwo));
  }
  removeItemTwo(i?: number) {
    if (this.editLogisticsRecord.controls.itemsTwo['length'] > 1) {
      this.editLogisticsRecord.controls.itemsTwo['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editLogisticsRecord.controls.itemsTwo['controls'] = [];
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
    this.itemsThree = this.editLogisticsRecord.get('itemsThree') as FormArray;
    this.itemsThree.push(this.createItemThree(itemsThree));
  }
  removeItemThree(i?: number) {
    if (this.editLogisticsRecord.controls.itemsThree['length'] > 1) {
      this.editLogisticsRecord.controls.itemsThree['controls'].splice(i, 1);
    }

    if (i === undefined) {
      this.editLogisticsRecord.controls.itemsThree['controls'] = [];
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

      this.editLogisticsRecord.patchValue(_logisticsExists[0]);

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
    this._lService.editLogisticsRecords(this.editLogisticsRecord.value);
    // console.log(this.createLogisticsRecord.value);
  }

}
