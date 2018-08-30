import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchRecordComponent } from './edit-batch-record.component';

describe('EditBatchRecordComponent', () => {
  let component: EditBatchRecordComponent;
  let fixture: ComponentFixture<EditBatchRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditBatchRecordComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
