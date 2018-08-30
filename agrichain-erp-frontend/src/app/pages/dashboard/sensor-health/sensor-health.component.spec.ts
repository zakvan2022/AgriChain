import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorHealthComponent } from './sensor-health.component';

describe('SensorHealthComponent', () => {
  let component: SensorHealthComponent;
  let fixture: ComponentFixture<SensorHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorHealthComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
