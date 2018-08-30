import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilMoistureAnalysisComponent } from './soil-moisture-analysis.component';

describe('SoilMoistureAnalysisComponent', () => {
  let component: SoilMoistureAnalysisComponent;
  let fixture: ComponentFixture<SoilMoistureAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoilMoistureAnalysisComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilMoistureAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
