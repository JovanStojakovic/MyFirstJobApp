import { Component, OnInit } from '@angular/core';
import { Company } from '../company-list/company';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServicesService } from '../shared/company-services/company-services.service';

@Component({
  selector: 'app-admin-company-details',
  templateUrl: './admin-company-details.component.html',
  styleUrls: ['./admin-company-details.component.css']
})
export class AdminCompanyDetailsComponent implements OnInit {
  id!:string
  company!: Company


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private companyService: CompanyServicesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      if (this.id) {
        this.getCompany();
      }
    });
  }
  getCompany(){
    this.companyService.getCompanyById(this.id).subscribe(
      response => {
        this.company = response;
      }
    );
  }

}
