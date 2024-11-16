import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs-list/job';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-details-for-user',
  templateUrl: './job-details-for-user.component.html',
  styleUrls: ['./job-details-for-user.component.css']
})
export class JobDetailsForUserComponent implements OnInit {
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
