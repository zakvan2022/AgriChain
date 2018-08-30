import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseLogisticsRecordComponent } from './reuse-logistics-record.component';

describe('ReuseLogisticsRecordComponent', () => {
  let component: ReuseLogisticsRecordComponent;
  let fixture: ComponentFixture<ReuseLogisticsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReuseLogisticsRecordComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseLogisticsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
