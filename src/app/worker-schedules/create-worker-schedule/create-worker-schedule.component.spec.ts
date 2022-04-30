import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkerScheduleComponent } from './create-worker-schedule.component';

describe('CreateWorkerScheduleComponent', () => {
  let component: CreateWorkerScheduleComponent;
  let fixture: ComponentFixture<CreateWorkerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkerScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
