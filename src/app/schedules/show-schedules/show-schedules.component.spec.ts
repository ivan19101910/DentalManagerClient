import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchedulesComponent } from './show-schedules.component';

describe('ShowSchedulesComponent', () => {
  let component: ShowSchedulesComponent;
  let fixture: ComponentFixture<ShowSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
