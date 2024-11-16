import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AddApplication } from 'src/app/add-application/addAplication';
import { Application } from 'src/app/add-application/application';



@Injectable({
  providedIn: 'root'
})
export class ApplicationServicesService {

  private apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  addApplication(addApplication: AddApplication, id: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/application/job/${id}`, addApplication, { responseType: 'text' });
  }
  getApplicationByUserUsername(username: string) {
    return this.httpClient.get<Application[]>(`${this.apiUrl}/application/user/${username}`);  // Koristi username
  }
  getApplicationByJobId(id: string) {
    return this.httpClient.get<Application[]>(`${this.apiUrl}/application/job/${id}`);
  }
}
