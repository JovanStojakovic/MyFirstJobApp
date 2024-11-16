import { Component, OnInit } from '@angular/core';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { Job } from '../jobs-list/job';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-jobs-by-company',
  templateUrl: './admin-jobs-by-company.component.html',
  styleUrls: ['./admin-jobs-by-company.component.css']
})
export class AdminJobsByCompanyComponent implements OnInit {
  id!:string
  jobs!: Job[]
  

  constructor(private jobService: JobServicesService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getJobsByCompany()
  }
  getJobsByCompany(){
    this.jobService.getJobsByCompanyId(this.id).subscribe(
      response => {
        this.jobs = response;
      }
    );
  }


}