import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor() { }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companies = [
      {
        name: 'SSW',
        email: 'info@ssw.com.au',
        phone: 12345456,
      },
      {
        name: 'Allianz',
        email: 'info@allianz.com',
        phone: 1234567
      }
    ];
  }




}
