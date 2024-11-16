import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth-services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from './login-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})
  loginRequest!: LoginRequest
  showAlert: boolean = false;
  showAlertSuccess: boolean = false
  showSuspendedAlert: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginRequest ={
      username: "",
      password: ""
    }

   }

   ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })
  }
  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;
  
    // Provera da li je korisnik suspendovan pre prijave
    this.authService.checkIfSuspended(this.loginRequest.username).subscribe(
      (user) => {
        if (user.suspended) {
          this.showSuspendedAlert = true; // Prikaži obaveštenje da je korisnik suspendovan
        } else {
          // Nastavi sa prijavom ako korisnik nije suspendovan
          this.authService.login(this.loginRequest).subscribe(
            (response) => {
              const token = JSON.parse(response);
              console.log(token.token);
              localStorage.setItem('token', token.token);
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
      },
      (error) => {
        console.error('Došlo je do greške', error);
        this.showAlert = true;
      }
    );
  }
  
  
  closeAlertSuccess() {
    this.showAlertSuccess = false;
  
    // Proveri da li je username "jovan" i preusmeri na specifičnu stranicu
    if (this.loginRequest.username === 'jovan') {
      this.router.navigate(['/adminPage']); // ovde ide ruta za Jovana
    } else {
      this.router.navigate(['/homePage']); // za sve ostale
    }
  }
  

}
