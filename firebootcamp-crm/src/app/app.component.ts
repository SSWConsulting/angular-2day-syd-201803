import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'fbc2';

  companyCount$: Observable<number>;

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies()
      .pipe(map(c => c.length));
  }

}
