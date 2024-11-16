import { Component, OnInit } from '@angular/core';
import { Company } from '../company-list/company';
import { AddJob } from './AddJob';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
  id!: string;
  company!: Company;
  createJob!: AddJob;
  addForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  showAlertSuccess: boolean = false;

  constructor(private jobServices: JobServicesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      plata: new FormControl('', [Validators.required]),
      opisPosla: new FormControl('', [Validators.required]),
      jobType: new FormControl('', [Validators.required]), // Menja se na select
      activeDate: new FormControl ('',Validators.required )
    });
  }

  addJob() {
    if (this.addForm.valid) {
      // Inicijalizuj addJob pre nego što mu dodeliš vrednosti
      this.createJob = {
        name: this.addForm.get('name')?.value,
        plata: this.addForm.get('plata')?.value,
        opisPosla: this.addForm.get('opisPosla')?.value,
        jobType: this.addForm.get('jobType')?.value,
        activeDate: this.addForm.get('activeDate')?.value
      };
  
      // Poziv servisa za dodavanje posla
      this.jobServices.addJob(this.createJob, this.id)
        .subscribe((response: any) => {
          this.showAlertSuccess = true; // Prikaz uspešnog obaveštenja
  
          // Automatski preusmeri na homePage nakon kratkog odlaganja
          setTimeout(() => {
            this.closeAlertSuccess(); // Ova metoda će preusmeriti korisnika
          }, 2000); // Održava obaveštenje vidljivim 2 sekunde
        }, (error: HttpErrorResponse) => {
          this.showAlert = true; // Prikaz greške
  
          // Prikazivanje specifične poruke greške, ako je potrebno
          console.error('Došlo je do greške pri dodavanju posla:', error.message);
        });
    } else {
      this.showAlert = true; // Prikaz greške ako forma nije validna
    }
  }
  

  closeAlert() {
    this.showAlert = false;
  }

  closeAlertSuccess() {
    this.showAlertSuccess = false;
    this.router.navigate(['/homePage']);
  }
}
