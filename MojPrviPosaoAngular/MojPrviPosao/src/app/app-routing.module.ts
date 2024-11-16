import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
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

const routes: Routes = [
  {path: "", component: WelcomePageComponent},
  {path: "registration", component: RegistrationPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "homePage", component: HomePageComponent},
  {path: "jobsList", component: JobsListComponent},
  {path: "companyList", component: CompanyListComponent},
  {path: "companyListPage", component: CompanyListPageComponent},
  {path: "jobDetails/:id", component: JobDetailsComponent},
  {path: "companyDetails/:id", component: CompanyDetailsComponent},
  {path: "myProfilePage", component: MyProfilePageComponent},
  {path: "companiesByUser", component: CopaniesByUserComponent},
  {path: "jobsByCompany/:id", component: JobsByCompanyComponent},
  {path: "navbar", component: NavbarComponent},
  {path: "addApplication/:id", component: AddApplicationComponent},
  {path: "applicationByUser", component: ApplicationByUserComponent},
  {path: "companyUserDetails/:id", component: CompanyUserDetailsComponent},
  {path: "jobCreate/:id", component: JobCreateComponent},
  {path: "adminPage", component: AdminPageComponent},
  { path: "adminUserDetails/:username", component: AdminUserDetailsComponent },
  {path: "adminCompanyDetails/:id", component: AdminCompanyDetailsComponent},
  {path: "adminJobsByCompany/:id", component: AdminJobsByCompanyComponent},
  {path: "adminJobDetails/:id", component: AdminJobDetailsComponent},
  {path: "adminNavbar", component: AdminNavbarComponent},
  {path: "jobDetailsForUser/:id", component: JobDetailsForUserComponent},
  {path: "jobDetailss/:id", component: JobDetailssComponent},
  {path: "applicationByCompany/:id", component: ApplicationsByCompanyComponent},
  {path: "updateJob/:id", component: UpdateJobComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
