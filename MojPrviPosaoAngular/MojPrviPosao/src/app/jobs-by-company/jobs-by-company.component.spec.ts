import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsByCompanyComponent } from './jobs-by-company.component';

describe('JobsByCompanyComponent', () => {
  let component: JobsByCompanyComponent;
  let fixture: ComponentFixture<JobsByCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsByCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsByCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
