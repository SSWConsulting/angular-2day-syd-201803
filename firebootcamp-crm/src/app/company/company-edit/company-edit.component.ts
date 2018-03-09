import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  company = {} as Company;
  companyId : number;
  isNewCompany: boolean;
  companyForm: FormGroup; // Important

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.companyId = ~~(this.activatedRoute.snapshot.params['id']);
    this.isNewCompany = this.companyId === 0;

    this.buildForm();

    if(!this.isNewCompany){
      this.getCompany()
    }

    this.companyForm.get('checkPhone').valueChanges.subscribe(
      value => {
        if(value){
          this.companyForm.get('phone').setValidators(Validators.required);
        }else{
          this.companyForm.get('phone').clearValidators();
        }
        this.companyForm.get('phone').updateValueAndValidity();
      }
    )
  }

  getCompany(): void {
    this.companyService.getCompany(this.companyId).subscribe(
      c => this.companyForm.patchValue(c)
    )
  }

  buildForm(): void{
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      email: [''],
      checkPhone: []
    })
  }

  saveCompany(): void {
    if(this.isNewCompany){
      this.companyService.addCompany(this.companyForm.value).subscribe(
        () => this.router.navigate(['/company/list'])
      )
    }else{
      const newCompany: Company = {...this.companyForm.value, id: this.companyId}
      // {... = Spread operator

      this.companyService.updateCompany(newCompany).subscribe(
        () => this.router.navigateByUrl('/company/list')
      )
    }
  }
}
