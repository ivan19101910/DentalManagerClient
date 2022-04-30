import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkerScheduleComponent } from './edit-worker-schedule.component';

describe('EditWorkerScheduleComponent', () => {
  let component: EditWorkerScheduleComponent;
  let fixture: ComponentFixture<EditWorkerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkerScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
