import { Component, OnInit } from '@angular/core';
import { myProfileDTO } from '../my-profile-page/getUserDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth-services/auth.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {
  username!: string;
  user!: myProfileDTO
  showAlert: boolean = false;
  showAlertSuccess: boolean = false;


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!; // koristite username umesto id
      this.getUser();
    });
  }

  getUser(){
    this.authService.getUserByUsername(this.username).subscribe(
      response => {
        this.user = response;
        console.log("User data:", this.user);
      },
      error => {
        console.error("Error fetching user:", error);
      }
    );
  }

  suspUser() {
    this.authService.suspendUser(this.username).subscribe(
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
