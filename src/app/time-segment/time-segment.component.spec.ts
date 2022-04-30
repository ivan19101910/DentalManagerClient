import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSegmentComponent } from './time-segment.component';

describe('TimeSegmentComponent', () => {
  let component: TimeSegmentComponent;
  let fixture: ComponentFixture<TimeSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
