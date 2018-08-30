import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirSunComponent } from './air-sun.component';

describe('AirSunComponent', () => {
  let component: AirSunComponent;
  let fixture: ComponentFixture<AirSunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirSunComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirSunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
