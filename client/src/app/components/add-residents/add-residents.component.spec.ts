import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidentsComponent } from './add-residents.component';

describe('AddResidentsComponent', () => {
  let component: AddResidentsComponent;
  let fixture: ComponentFixture<AddResidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
