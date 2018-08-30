import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceTraceabilityComponent } from './produce-traceability.component';

describe('ProduceTraceabilityComponent', () => {
  let component: ProduceTraceabilityComponent;
  let fixture: ComponentFixture<ProduceTraceabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduceTraceabilityComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceTraceabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
