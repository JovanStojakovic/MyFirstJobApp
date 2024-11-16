import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AuthService } from '../shared/auth-services/auth.service';
import { Company } from '../company-list/company';
import { CompanyServicesService } from '../shared/company-services/company-services.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  id!:string
  users!: User[]
  companies!: Company[]

  constructor(private authService: AuthService, private companyService: CompanyServicesService) { }

  ngOnInit(): void {
    this.getUsers()
    this.getAllCopmanies()
  }

  getUsers(){
    this.authService.getAllUsers().subscribe(
      response => {
        this.users = response
      }
    )
  }
  getAllCopmanies(){
    this.companyService.getCompanies().subscribe(
      response => {
        this.companies = response
      }
    )
  }
}
