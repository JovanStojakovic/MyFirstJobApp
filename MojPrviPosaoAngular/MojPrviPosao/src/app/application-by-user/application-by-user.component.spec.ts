import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationByUserComponent } from './application-by-user.component';

describe('ApplicationByUserComponent', () => {
  let component: ApplicationByUserComponent;
  let fixture: ComponentFixture<ApplicationByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
