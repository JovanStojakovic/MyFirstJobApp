import { Component, OnInit } from '@angular/core';
import { Application } from '../add-application/application';
import { ActivatedRoute, Router } from '@angular/router';
import { JobServicesService } from '../shared/job-services/job-services.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationServicesService } from '../shared/application-services/application-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-applications-by-company',
  templateUrl: './applications-by-company.component.html',
  styleUrls: ['./applications-by-company.component.css']
})
export class ApplicationsByCompanyComponent implements OnInit {
  id!: string;
  applications!: Application[]

  constructor(
    private applicationServices: ApplicationServicesService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.getApplicationsByJob();
  }
  getApplicationsByJob() {
    this.applicationServices.getApplicationByJobId(this.id).subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        console.log('Loaded applications:', this.applications);  // Proveri podatke
      },
      error: (error) => {
        console.error('Error loading applications', error);
      }
    });
  }
  downloadFile(pdfData: string, fileName: string) {
    const linkSource = `data:application/pdf;base64,${pdfData}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  getSafeUrl(filePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(filePath);
  }

}
