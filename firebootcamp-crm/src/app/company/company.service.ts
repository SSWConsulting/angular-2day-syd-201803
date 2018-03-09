import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCompany(id: number): Observable<Company>{
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.API_BASE}/company`,
     company,
     { headers: new HttpHeaders().set('content-type', 'application/json')})
     .pipe(
       catchError(this.errorHandler)
     );
  }

  getCompany(companyId: number): Observable<Company>{
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateCompany(company: Company): Observable<Company>{
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Error): Observable<any> {
    console.error('ERROR HANDLER', error);
    return new EmptyObservable();
  }

  // import { EmptyObservable } from 'rxjs/observable/EmptyObservable';



}
