import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchResultComponent } from './batch-result.component';

describe('BatchResultComponent', () => {
  let component: BatchResultComponent;
  let fixture: ComponentFixture<BatchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchResultComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
