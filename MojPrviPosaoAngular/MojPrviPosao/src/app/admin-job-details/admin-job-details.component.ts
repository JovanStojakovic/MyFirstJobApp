import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs-list/job';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-job-details',
  templateUrl: './admin-job-details.component.html',
  styleUrls: ['./admin-job-details.component.css']
})
export class AdminJobDetailsComponent implements OnInit {
  id!:string
  job!: Job

  constructor(private jobService: JobServicesService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getJob()
  }

  getJob(){
    this.jobService.getJobById(this.id).subscribe(
      response => {
        this.job = response;
      }
    );
  }

}
