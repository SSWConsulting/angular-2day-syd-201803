import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable()
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
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
