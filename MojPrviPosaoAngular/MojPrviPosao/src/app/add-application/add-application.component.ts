import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationServicesService } from '../shared/application-services/application-services.service';
import { AddApplication } from './addAplication'; // Izmenjen naziv za doslednost
import { Job } from '../jobs-list/job';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  id!: string;
  job!: Job;
  addApplication!: AddApplication;
  addForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  showAlertSuccess: boolean = false;
  selectedFile: File | null = null; // Nova varijabla za čuvanje odabranog fajl

  constructor(private applicationService: ApplicationServicesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.addForm = new FormGroup({
      ime: new FormControl('', [Validators.required]),
      prezime: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      srednjaSkola: new FormControl('', [Validators.required]),
      fakultet: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Čuvamo odabrani fajl
  }
  
  createApplication() {
    if (this.addForm.valid) {
      // Kreiraj `AddApplication` objekat sa podacima iz forme
      this.addApplication = {
        ime: this.addForm.get('ime')?.value,
        prezime: this.addForm.get('prezime')?.value,
        email: this.addForm.get('email')?.value,
        number: this.addForm.get('number')?.value,
        address: this.addForm.get('address')?.value,
        srednjaSkola: this.addForm.get('srednjaSkola')?.value,
        fakultet: this.addForm.get('fakultet')?.value,
        pdfContent: null
      };
      
      // Ako je PDF fajl izabran, konvertuj ga u Base64 string
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result as string;
          const base64Content = base64Data.split(',')[1]; // Uzimamo samo Base64 deo
          this.addApplication.pdfContent = base64Content; // Postavi PDF kao Base64 string
          // Poziv servisa za slanje prijave
          this.sendApplication();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.sendApplication(); // Pošalji prijavu bez PDF fajla ako nije izabran
      }
    } else {
      this.showAlert = true;
    }
  }
  
  sendApplication() {
    this.applicationService.addApplication(this.addApplication, this.id)
      .subscribe(
        (response: any) => {
          this.showAlertSuccess = true;
          setTimeout(() => {
            this.closeAlertSuccess();
          }, 2000);
        },
        (error: HttpErrorResponse) => {
          if (error) {
            this.showAlert = true;
          }
        }
      );
  }
  closeAlert() {
    this.showAlert = false;
  }
  
  closeAlertSuccess() {
    this.showAlertSuccess = false;
    this.router.navigate(['/homePage']);
  }
}

