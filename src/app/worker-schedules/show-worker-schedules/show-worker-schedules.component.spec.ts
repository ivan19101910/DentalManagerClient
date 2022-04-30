import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkerSchedulesComponent } from './show-worker-schedules.component';

describe('ShowWorkerSchedulesComponent', () => {
  let component: ShowWorkerSchedulesComponent;
  let fixture: ComponentFixture<ShowWorkerSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorkerSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWorkerSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
