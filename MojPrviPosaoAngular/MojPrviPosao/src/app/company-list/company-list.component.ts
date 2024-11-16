import { Component, OnInit } from '@angular/core';
import { CompanyServicesService } from '../shared/company-services/company-services.service';
import { Company } from './company';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies!: Company[]
  filterForm: FormGroup = new FormGroup({})

  constructor(private companyService: CompanyServicesService) { }

  ngOnInit(): void {
    this.getAllCopmanies()

    this.filterForm = new FormGroup({
      name: new FormControl(""),
      place: new FormControl("")
    })
  }

  getAllCopmanies(){
    this.companyService.getCompanies().subscribe(
      response => {
        this.companies = response
      }
    )
  }

  filter() {
    const name = this.filterForm.get('name')?.value;
    const place = this.filterForm.get('place')?.value;

    this.companyService.getFilteredCompanies(name, place)
        .subscribe(
            response => {
                this.companies = response; // Ažuriraj jobs niz sa filtriranim podacima
            },
            error => {
                console.error('Greška prilikom dobijanja komanija:', error);
            }
        );
}

}
