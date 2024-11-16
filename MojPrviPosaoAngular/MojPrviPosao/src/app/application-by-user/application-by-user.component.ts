import { Component, OnInit } from '@angular/core';
import { ApplicationServicesService } from '../shared/application-services/application-services.service';
import { AuthService } from '../shared/auth-services/auth.service';
import { Application } from '../add-application/application';

@Component({
  selector: 'app-application-by-user',
  templateUrl: './application-by-user.component.html',
  styleUrls: ['./application-by-user.component.css']
})
export class ApplicationByUserComponent implements OnInit {

  applications!: Application[]

  constructor(private applicatonServices: ApplicationServicesService,private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      console.error('User is not logged in');
      return;
    }
  
    const username = this.authService.findUserId();  // Koristi username umesto user ID
    console.log('Retrieved Username:', username);
  
    if (username) {
      this.getApplicationsByUser(username);
    } else {
      console.error('Username not found');
    }
  }

  getApplicationsByUser(username: string) {
    this.applicatonServices.getApplicationByUserUsername(username).subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        console.log('Loaded companies:', this.applications);  // Proveri podatke
      },
      error: (error) => {
        console.error('Error loading companies', error);
      }
    });
  }

}
