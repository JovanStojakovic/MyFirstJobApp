import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserDetailsComponent } from './company-user-details.component';

describe('CompanyUserDetailsComponent', () => {
  let component: CompanyUserDetailsComponent;
  let fixture: ComponentFixture<CompanyUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
