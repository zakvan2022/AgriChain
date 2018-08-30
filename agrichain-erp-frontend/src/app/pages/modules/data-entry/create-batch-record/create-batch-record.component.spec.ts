import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchRecordComponent } from './create-batch-record.component';

describe('CreateBatchRecordComponent', () => {
  let component: CreateBatchRecordComponent;
  let fixture: ComponentFixture<CreateBatchRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBatchRecordComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBatchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
