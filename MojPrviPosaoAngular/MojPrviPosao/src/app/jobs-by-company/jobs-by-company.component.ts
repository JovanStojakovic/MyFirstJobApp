import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs-list/job';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobs-by-company',
  templateUrl: './jobs-by-company.component.html',
  styleUrls: ['./jobs-by-company.component.css']
})
export class JobsByCompanyComponent implements OnInit {
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
