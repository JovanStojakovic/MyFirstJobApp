import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsForUserComponent } from './job-details-for-user.component';

describe('JobDetailsForUserComponent', () => {
  let component: JobDetailsForUserComponent;
  let fixture: ComponentFixture<JobDetailsForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
