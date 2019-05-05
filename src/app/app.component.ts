import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Address } from './address/address.component';

export type FormConfig<T extends object = {}> = {
	[K in keyof T]: any;
};

interface Employee {
  firstName: string,
  lastName: string,
  address: Address
}

const EMPLOYEE_FORM_CONFIG: FormConfig<Employee> = {
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  address: ''
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  form = this.fb.group(EMPLOYEE_FORM_CONFIG)
  
  constructor(private readonly fb: FormBuilder) { }

  save() {
    // When I click "save" I want all of the fields that have errors to highlight in red with the appropriate error message. My assumption was I could programatically mark the address FormControl as "touched" and then hook into that touch() function call inside the Address component.

    this.form.get('address').markAsTouched();
    console.log('Address Control Touched: ', this.form.get('address').touched);
    console.log('Address Control Valid: ', this.form.get('address').valid);

  }
}
