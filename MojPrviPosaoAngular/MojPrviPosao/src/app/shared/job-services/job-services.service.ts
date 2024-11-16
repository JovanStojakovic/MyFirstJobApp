import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddJob } from 'src/app/job-create/AddJob';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdateRequest } from 'src/app/update-job/updateJob';

@Injectable({
  providedIn: 'root'
})
export class JobServicesService {
  
  private apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  getJobs() {
    return this.httpClient.get<any>(`${this.apiUrl}/job/active`);
  }
  getJobById(id: string){
    return this.httpClient.get<any>(`${this.apiUrl}/job/` + id)
  }
  getJobsByCompanyId(id: string){
    return this.httpClient.get<any>(`${this.apiUrl}/job/company/` + id)
  }
  addJob(addJob: AddJob, id: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/job/company/${id}`, addJob, { responseType: 'text' });
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/job/${id}`, { responseType: 'text' });
  }
  update(updateJob: UpdateRequest, id: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/job/${id}`, updateJob, { responseType: 'text' });
  }

  getFilteredJobs( sortBy?: string, name?: string, jobType?: string){
    let url = `${this.apiUrl}/job/all?`;
    if (sortBy) {
        url += `sortBy=${sortBy}&`;
    }
    if (name) {
        url += `name=${name}&`;
    }
    if (jobType) {
        url += `jobType=${jobType}&`;
    }
    // Remove the trailing '&' if there are any query parameters
    if (url.endsWith('&')) {
        url = url.slice(0, -1);
    }

    return this.httpClient.get<any>(url);
  }

  
}
