import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterControlComponent } from './water-control.component';

describe('WaterControlComponent', () => {
  let component: WaterControlComponent;
  let fixture: ComponentFixture<WaterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterControlComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
