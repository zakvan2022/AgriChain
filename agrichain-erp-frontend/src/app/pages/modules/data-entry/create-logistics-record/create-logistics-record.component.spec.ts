import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogisticsRecordComponent } from './create-logistics-record.component';

describe('CreateLogisticsRecordComponent', () => {
  let component: CreateLogisticsRecordComponent;
  let fixture: ComponentFixture<CreateLogisticsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLogisticsRecordComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLogisticsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
