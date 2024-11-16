import { Component, OnInit } from '@angular/core'
import {Job} from './job'
import { JobServicesService } from '../shared/job-services/job-services.service'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs!: Job[]
  filterForm: FormGroup = new FormGroup({})

  constructor(private jobService: JobServicesService) { }

  ngOnInit(): void {
    this.getAllJobs()

    this.filterForm = new FormGroup({
      sortBy: new FormControl(""),
      name: new FormControl(""),
      jobType: new FormControl("")
    })
  }

  getAllJobs(){
    this.jobService.getJobs().subscribe(
      response => {
        this.jobs = response
      }
    )
  }

  filter() {
    const sortBy = this.filterForm.get('sortBy')?.value; // Proveri da li trebaš ovaj deo
    const name = this.filterForm.get('name')?.value;
    const jobType = this.filterForm.get('jobType')?.value;

    this.jobService.getFilteredJobs( sortBy, name, jobType)
        .subscribe(
            response => {
                this.jobs = response; // Ažuriraj jobs niz sa filtriranim podacima
            },
            error => {
                console.error('Greška prilikom dobijanja poslova:', error);
            }
        );
}



}
