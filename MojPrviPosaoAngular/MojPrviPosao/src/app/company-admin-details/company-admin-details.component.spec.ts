import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminDetailsComponent } from './company-admin-details.component';

describe('CompanyAdminDetailsComponent', () => {
  let component: CompanyAdminDetailsComponent;
  let fixture: ComponentFixture<CompanyAdminDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdminDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
