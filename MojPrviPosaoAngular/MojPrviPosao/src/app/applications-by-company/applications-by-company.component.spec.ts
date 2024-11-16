import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsByCompanyComponent } from './applications-by-company.component';

describe('ApplicationsByCompanyComponent', () => {
  let component: ApplicationsByCompanyComponent;
  let fixture: ComponentFixture<ApplicationsByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsByCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
