import { Component, OnInit } from '@angular/core';
import { Job } from '../jobs-list/job';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-detailss',
  templateUrl: './job-detailss.component.html',
  styleUrls: ['./job-detailss.component.css']
})
export class JobDetailssComponent implements OnInit {
  id!: string;
  job!: Job;
  showAlert: boolean = false;
  showAlertSuccess: boolean = false;

  constructor(
    private jobService: JobServicesService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getJob();
  }

  getJob() {
    this.jobService.getJobById(this.id).subscribe(
      response => {
        this.job = response;
      }
    );
  }

  deleteJob() {
    this.jobService.delete(this.id).subscribe(
      (response: any) => {
        this.showAlertSuccess = true; // Prikaz uspešnog obaveštenja
  
        // Automatski preusmeri na homePage nakon kratkog odlaganja
        setTimeout(() => {
          this.closeAlertSuccess(); // Metoda za zatvaranje obaveštenja i preusmeravanje
        }, 2000); // Održava obaveštenje vidljivim 2 sekunde
      },
      (error: HttpErrorResponse) => {
        this.showAlert = true; // Prikaz greške
  
        // Prikazivanje specifične poruke greške, ako je potrebno
        console.error('Došlo je do greške pri brisanju posla:', error.message);
      }
    );
  }
  
  closeAlertSuccess() {
    this.showAlertSuccess = false;
    this.router.navigate(['/homePage']);
  }

  closeAlert() {
    this.showAlert = false;
  }
}
