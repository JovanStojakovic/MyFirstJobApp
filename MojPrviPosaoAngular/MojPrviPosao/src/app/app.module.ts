import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Uveri da je HTTP_INTERCEPTORS ovde importovan
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JwtInterceptor } from './shared/auth.interceptor';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { CopaniesByUserComponent } from './copanies-by-user/copanies-by-user.component';
import { JobsByCompanyComponent } from './jobs-by-company/jobs-by-company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { ApplicationByUserComponent } from './application-by-user/application-by-user.component';
import { CompanyUserDetailsComponent } from './company-user-details/company-user-details.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminCompanyDetailsComponent } from './admin-company-details/admin-company-details.component';
import { AdminJobsByCompanyComponent } from './admin-jobs-by-company/admin-jobs-by-company.component';
import { AdminJobDetailsComponent } from './admin-job-details/admin-job-details.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { JobDetailsForUserComponent } from './job-details-for-user/job-details-for-user.component';
import { JobDetailssComponent } from './job-detailss/job-detailss.component';
import { ApplicationsByCompanyComponent } from './applications-by-company/applications-by-company.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { CompanyAdminDetailsComponent } from './company-admin-details/company-admin-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    JobsListComponent,
    CompanyListComponent,
    CompanyListPageComponent,
    JobDetailsComponent,
    CompanyDetailsComponent,
    MyProfilePageComponent,
    CopaniesByUserComponent,
    JobsByCompanyComponent,
    NavbarComponent,
    AddApplicationComponent,
    ApplicationByUserComponent,
    CompanyUserDetailsComponent,
    JobCreateComponent,
    AdminPageComponent,
    AdminUserDetailsComponent,
    AdminCompanyDetailsComponent,
    AdminJobsByCompanyComponent,
    AdminJobDetailsComponent,
    AdminNavbarComponent,
    JobDetailsForUserComponent,
    JobDetailssComponent,
    ApplicationsByCompanyComponent,
    UpdateJobComponent,
    CompanyAdminDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
