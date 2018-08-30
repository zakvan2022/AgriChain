import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationWindSpeedComponent } from './precipitation-wind-speed.component';

describe('PrecipitationWindSpeedComponent', () => {
  let component: PrecipitationWindSpeedComponent;
  let fixture: ComponentFixture<PrecipitationWindSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecipitationWindSpeedComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitationWindSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
