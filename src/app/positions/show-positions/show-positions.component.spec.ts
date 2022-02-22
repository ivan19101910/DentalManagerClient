import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPositionsComponent } from './show-positions.component';

describe('ShowPositionsComponent', () => {
  let component: ShowPositionsComponent;
  let fixture: ComponentFixture<ShowPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
