import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseBatchRecordComponent } from './reuse-batch-record.component';

describe('ReuseBatchRecordComponent', () => {
  let component: ReuseBatchRecordComponent;
  let fixture: ComponentFixture<ReuseBatchRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReuseBatchRecordComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseBatchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
