import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogisticsRecordComponent } from './edit-logistics-record.component';

describe('EditLogisticsRecordComponent', () => {
  let component: EditLogisticsRecordComponent;
  let fixture: ComponentFixture<EditLogisticsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditLogisticsRecordComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogisticsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
