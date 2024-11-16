import { Component, OnInit } from '@angular/core';
import { RegisterRequestPlaylad } from './register-request-playlad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth-services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerRequestPlaylad!: RegisterRequestPlaylad;
  registerForm!: FormGroup;
  showAlert: boolean = false;
  showAlertSuccess: boolean = false

  constructor(private authService: AuthService, private router : Router) {
    this.registerRequestPlaylad = { 
      username: '',
      password: '',
      email: '',
      name: '',
      surname: '',
      phone: '',
      birthDate: new Date
    };
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl ('', Validators.required),
      password: new FormControl ('',Validators.required ),
      email: new FormControl ('',[ Validators.required, Validators.email ] ),
      name: new FormControl ('', Validators.required),
      surname: new FormControl ('',Validators.required ),
      phone: new FormControl ('', Validators.required),
      birthDate: new FormControl ('',Validators.required ),
     });
  }
  register() {
    this.registerRequestPlaylad.username = this.registerForm.get('username')?.value;
    this.registerRequestPlaylad.password = this.registerForm.get('password')?.value;
    this.registerRequestPlaylad.email = this.registerForm.get('email')?.value;
    this.registerRequestPlaylad.name = this.registerForm.get('name')?.value;
    this.registerRequestPlaylad.surname = this.registerForm.get('surname')?.value;
    this.registerRequestPlaylad.phone = this.registerForm.get('phone')?.value;
    this.registerRequestPlaylad.birthDate = this.registerForm.get('birthDate')?.value;
  
    this.authService.register(this.registerRequestPlaylad).subscribe(
      (response) => {
        console.log(response);
        this.showAlertSuccess = true; // Prikaži obaveštenje o uspešnoj registraciji
  
        // Nakon 2 sekunde sakrij obaveštenje i preusmeri na login stranicu
        setTimeout(() => {
          this.closeAlertSuccess();
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        console.error('Došlo je do greške prilikom registracije', error);
        this.showAlert = true; // Prikaži obaveštenje o grešci
      }
    );
  }
  
  closeAlertSuccess() {
    this.showAlertSuccess = false;
    this.router.navigate(['/login']); // Preusmeri na login stranicu nakon uspešne registracije
  }
}