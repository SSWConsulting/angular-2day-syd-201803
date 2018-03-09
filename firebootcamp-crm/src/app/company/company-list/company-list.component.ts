import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs/Subscription';
import {takeWhile} from 'rxjs/operators/takeWhile';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<Company[]>;

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(company: Company) {
    this.companyService.deleteCompany(company.id)
    .subscribe(c => this.getCompanies());
  }
}
