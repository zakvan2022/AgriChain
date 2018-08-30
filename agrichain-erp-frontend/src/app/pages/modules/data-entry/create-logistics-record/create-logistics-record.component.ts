import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LogisticsRecordService } from '../../../_services/logistics-record.service';

@Component({
  selector: 'ngx-create-logistics-record',
  templateUrl: './create-logistics-record.component.html',
  styleUrls: ['./create-logistics-record.component.scss'],
})
export class CreateLogisticsRecordComponent implements OnInit {
  createLogisticsRecord: FormGroup;
  items: any = [];
  ItemsTwo: any = [];
  ItemsThree: any = [];
  constructor(private formBuilder: FormBuilder, private _lService: LogisticsRecordService) { }

  ngOnInit() {
    this.createLogisticsRecord = this.formBuilder.group({
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
      ItemsTwo: this.formBuilder.array([this.createItemTwo()]),
      ItemsThree: this.formBuilder.array([this.createItemThree()]),
      Comment: '',
    });
  }
  // ITEMS ONE
  createItem(): FormGroup {
    return this.formBuilder.group({
      temperature: '',
      temperatureUnit: '',
    });
  }
  addItem() {
    this.items = this.createLogisticsRecord.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  removeItem(i) {
    if (this.createLogisticsRecord.controls.items['length'] > 1) {
      this.createLogisticsRecord.controls.items['controls'].splice(i, 1);
      // this.createLogisticsRecord.get("items").removeAt(i);
    }
  }
  // ITEMS TWO
  createItemTwo(): FormGroup {
    return this.formBuilder.group({
      constituentsId: '',
      constituentsType: '',
      constituentsCompany: '',
      constituentsTime: '',
      constituentsBarcodeId: '',
    });
  }
  addItemTwo() {
    this.ItemsTwo = this.createLogisticsRecord.get('ItemsTwo') as FormArray;
    this.ItemsTwo.push(this.createItemTwo());
  }
  removeItemTwo(i) {
    if (this.createLogisticsRecord.controls.ItemsTwo['length'] > 1) {
      this.createLogisticsRecord.controls.ItemsTwo['controls'].splice(i, 1);
    }
  }
  // ITEMS THREE
  createItemThree(): FormGroup {
    return this.formBuilder.group({
      unavailableConstituentsId: '',
      unavailableConstituentsType: '',
      unavailableConstituentsCompany: '',
      unavailableConstituentsTime: '',
      unavailableConstituentsLocation: '',
    });
  }
  addItemThree() {
    this.ItemsThree = this.createLogisticsRecord.get('ItemsThree') as FormArray;
    this.ItemsThree.push(this.createItemThree());
  }
  removeItemThree(i) {
    if (this.createLogisticsRecord.controls.ItemsThree['length'] > 1) {
      this.createLogisticsRecord.controls.ItemsThree['controls'].splice(i, 1);
    }
  }
  LogisticsRecordData() {
    this._lService.createLogisticsRecords(this.createLogisticsRecord.value);
    // console.log(this.createLogisticsRecord.value);
  }
}
