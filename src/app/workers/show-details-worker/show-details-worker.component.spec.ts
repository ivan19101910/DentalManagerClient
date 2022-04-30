import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsWorkerComponent } from './show-details-worker.component';

describe('ShowDetailsWorkerComponent', () => {
  let component: ShowDetailsWorkerComponent;
  let fixture: ComponentFixture<ShowDetailsWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
