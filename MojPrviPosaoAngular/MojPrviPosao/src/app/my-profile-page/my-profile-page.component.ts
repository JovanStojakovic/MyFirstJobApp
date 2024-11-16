import { Component, OnInit } from '@angular/core';
import { myProfileDTO } from './getUserDTO';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.css']
})
export class MyProfilePageComponent implements OnInit {
  loggedUsername!:string
  loggedUser!:myProfileDTO

  constructor(private http: HttpClient,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUsername = this.authService.findUsername();
    this.getUser();
  }

  getUser(){
    this.authService.getCurrentUser().subscribe(data => {
      console.log(data);
      this.loggedUser = data;
    });
  }
  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']);
  }
  

}
