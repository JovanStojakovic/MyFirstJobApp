import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobsByCompanyComponent } from './admin-jobs-by-company.component';

describe('AdminJobsByCompanyComponent', () => {
  let component: AdminJobsByCompanyComponent;
  let fixture: ComponentFixture<AdminJobsByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobsByCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobsByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
