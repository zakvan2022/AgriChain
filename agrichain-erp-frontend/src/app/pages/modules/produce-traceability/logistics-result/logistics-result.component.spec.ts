import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsResultComponent } from './logistics-result.component';

describe('LogisticsResultComponent', () => {
  let component: LogisticsResultComponent;
  let fixture: ComponentFixture<LogisticsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsResultComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
