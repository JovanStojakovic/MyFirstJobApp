import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs-list/job';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateRequest } from './updateJob';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {
  id!:string
  job!: Job
  updateForm: FormGroup = new FormGroup({})
  updateRequest!: UpdateRequest
  showAlert: boolean = false;
  showAlertSuccess: boolean = false
  constructor(private httpClient: HttpClient, private jobService: JobServicesService, private route: ActivatedRoute, private router: Router) { 
    this.updateRequest ={
      name: "",
      activeDate: new Date,
      plata:  0,
    }
    this.job ={
        id: 0,
        name: '',
        creationDate: new Date(),
        jobType: '',
        plata: 0,
        opisPosla: '',
        companyId: 0,
        userId: 0,
        activeDate: new Date(),
        status: ''

    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getJob()
    this.updateForm = new FormGroup({
      name: new FormControl(""),
      activeDate: new FormControl(""),
      plata: new FormControl(""),

    })
  }
  getJob() {
    this.jobService.getJobById(this.id).subscribe(
      response => {
        this.job = response;
        this.updateForm.patchValue({
          name: this.job.name,
          activeDate: this.job.activeDate,
          plata: this.job.plata
        });
      }
    );
  }
  
  update() {
    this.updateRequest.name = String(this.updateForm.get('name')?.value);
    this.updateRequest.activeDate = this.updateForm.get('activeDate')?.value;
    this.updateRequest.plata = Number(this.updateForm.get('plata')?.value);

    this.jobService.update(this.updateRequest, this.id)
        .subscribe(response => {
            this.showAlertSuccess = true;
            this.router.navigate([`/homePage`]); // Preusmerava na novu putanju nakon uspešne izmene
        }, (error: HttpErrorResponse) => {
            if (error) {
                this.showAlert = true;
            }
        });
}

closeAlert() {
    this.showAlert = false;
}

closeAlertSuccess() {
    this.showAlertSuccess = false;
}

}