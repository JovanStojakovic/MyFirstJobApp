import { Component, OnInit } from '@angular/core';
import { Company } from '../company-list/company';
import { AuthService } from '../shared/auth-services/auth.service';
import { CompanyServicesService } from '../shared/company-services/company-services.service';

@Component({
  selector: 'app-copanies-by-user',
  templateUrl: './copanies-by-user.component.html',
  styleUrls: ['./copanies-by-user.component.css']
})
export class CopaniesByUserComponent implements OnInit {
  companies: Company[] = [];  // Koristimo interfejs sa 'user' objektom

  constructor(private companyService: CompanyServicesService,private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      console.error('User is not logged in');
      return;
    }
  
    const username = this.authService.findUserId();  // Koristi username umesto user ID
    console.log('Retrieved Username:', username);
  
    if (username) {
      this.getCompaniesByUser(username);
    } else {
      console.error('Username not found');
    }
  }

  getCompaniesByUser(username: string) {
    this.companyService.getCompanyByUserUsername(username).subscribe({
      next: (data: Company[]) => {
        this.companies = data;
        console.log('Loaded companies:', this.companies);  // Proveri podatke
      },
      error: (error) => {
        console.error('Error loading companies', error);
      }
    });
  }
}
