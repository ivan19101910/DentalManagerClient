import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCitiesComponent } from './show-cities.component';

describe('ShowCitiesComponent', () => {
  let component: ShowCitiesComponent;
  let fixture: ComponentFixture<ShowCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
