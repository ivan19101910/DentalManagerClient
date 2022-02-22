import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOfficesComponent } from './show-offices.component';

describe('ShowOfficesComponent', () => {
  let component: ShowOfficesComponent;
  let fixture: ComponentFixture<ShowOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
