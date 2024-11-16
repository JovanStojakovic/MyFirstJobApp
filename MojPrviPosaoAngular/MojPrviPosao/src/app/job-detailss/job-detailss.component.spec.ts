import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailssComponent } from './job-detailss.component';

describe('JobDetailssComponent', () => {
  let component: JobDetailssComponent;
  let fixture: ComponentFixture<JobDetailssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
