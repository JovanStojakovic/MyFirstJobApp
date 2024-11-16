import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaniesByUserComponent } from './copanies-by-user.component';

describe('CopaniesByUserComponent', () => {
  let component: CopaniesByUserComponent;
  let fixture: ComponentFixture<CopaniesByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopaniesByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopaniesByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
