import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServicesService } from '../shared/company-services/company-services.service';
import { HttpClient } from '@angular/common/http';
import { CompanyAdmin } from '../admin-page/companyAdmin';

@Component({
  selector: 'app-company-admin-details',
  templateUrl: './company-admin-details.component.html',
  styleUrls: ['./company-admin-details.component.css']
})
export class CompanyAdminDetailsComponent implements OnInit {
  id!:string
  company!: CompanyAdmin


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private companyService: CompanyServicesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getCompany()
  }
  getCompany(){
    this.companyService.getCompanyById(this.id).subscribe(
      response => {
        this.company = response;
      }
    );
  }

}
