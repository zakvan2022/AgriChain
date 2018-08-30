import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationWindComponent } from './precipitation-wind.component';

describe('PrecipitationWindComponent', () => {
  let component: PrecipitationWindComponent;
  let fixture: ComponentFixture<PrecipitationWindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecipitationWindComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecipitationWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
