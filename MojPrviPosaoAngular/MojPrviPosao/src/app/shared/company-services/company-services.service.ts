import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/company-list/company';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CompanyServicesService {
  private apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  getCompanies() {
    return this.httpClient.get<Company[]>(`${this.apiUrl}/company/all`);
  }
  getCompanyById(id: string){
    return this.httpClient.get<any>(`${this.apiUrl}/company/` + id)
  }
  getCompanyByUserUsername(username: string) {
    return this.httpClient.get<Company[]>(`${this.apiUrl}/company/user/${username}`);  // Koristi username
  }
  getFilteredCompanies(  name?: string, place?: string){
    let url = `${this.apiUrl}/company/all?`;
    
    if (name) {
        url += `name=${name}&`;
    }
    if (place) {
        url += `place=${place}&`;
    }
    // Remove the trailing '&' if there are any query parameters
    if (url.endsWith('&')) {
        url = url.slice(0, -1);
    }

    return this.httpClient.get<any>(url);
  }
}
