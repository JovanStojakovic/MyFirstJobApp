import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/login-page/login-request';
import { RegisterRequestPlaylad } from 'src/app/registration-page/register-request-playlad';
import { environment } from 'src/environments/environment';
import { MyProfilePageComponent } from 'src/app/my-profile-page/my-profile-page.component';
import { myProfileDTO } from 'src/app/my-profile-page/getUserDTO';
import { User } from 'src/app/admin-page/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  checkIfSuspended(username: string): Observable<myProfileDTO> {
    return this.httpClient.get<myProfileDTO>(`${this.apiUrl}/auth/${username}`);
  }
  
  login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/login`, loginRequest, { responseType: 'text' });
  }
  

  register(registerRequestPlaylad: RegisterRequestPlaylad): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/auth/registration`, registerRequestPlaylad, { responseType: 'text' }
    );
  }

  isLogged(): boolean{
    const token = localStorage.getItem("token")
    if(token){
      return true
    }
    return false;
  }
  findUsername(): string {
    let token = this.parseToken();

    if (token) {
      return this.parseToken()['sub'];
    }
    return '';
  }
  private parseToken() {
    let jwt = localStorage.getItem('token');
    if (jwt !== null) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      return decodedJwtData;
    }
  }


  logout(){
    localStorage.removeItem("token")
  }
  getJwtToken (){
    return localStorage.getItem("token")
  }

  getCurrentUser(): Observable<myProfileDTO> {
    return this.httpClient.get<myProfileDTO>(`${this.apiUrl}/user/currentUser`);
  }

//preko tokena da se prikaze ulogovani korisnik
  findUserId(): string {
    const token = this.parseToken();
    return token ? token['sub'] : '';  // Koristi 'sub' kao korisnički ID
  }
  //ode metode dole su za "admina"
  getAllUsers() {
    return this.httpClient.get<User[]>(`${this.apiUrl}/user/all`);
  }
  getUserByUsername(username: string): Observable<myProfileDTO> {
    return this.httpClient.get<myProfileDTO>(`${this.apiUrl}/auth/${username}`);
  }
  suspendUser(username: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/user/suspend/${username}`, {}, { responseType: 'text' });
  }
}
