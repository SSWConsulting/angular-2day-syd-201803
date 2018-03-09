import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { catchError } from 'rxjs/operators/catchError';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class CompanyService {

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
   }

   companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  API_BASE = environment.API_BASE;

loadCompanies() {
  this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
  .subscribe(c => this.companies$.next(c));
}

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(id: number) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
    .subscribe(() => this.loadCompanies());
  }

  addCompany(company: Company){
    return this.httpClient.post<Company>(`${this.API_BASE}/company`,
     company,
     { headers: new HttpHeaders().set('content-type', 'application/json')})
     .pipe(
       catchError(this.errorHandler)
     ).subscribe(() => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company>{
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .pipe(
      catchError(this.errorHandler)
    )
    .subscribe(() => this.loadCompanies());
  }

  errorHandler(error: Error): Observable<any> {
    console.error('ERROR HANDLER', error);
    return new EmptyObservable();
  }

  // import { EmptyObservable } from 'rxjs/observable/EmptyObservable';



}
