import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { addressFormConfig } from './address/address.component';

export type FormConfig<T extends object = {}> = {
	[K in keyof T]: any;
};

// interface Employee {
//   firstName: string,
//   lastName: string,
//   address: Address
// }

// interface Address {
//   address1: string,
//   address2: string,
//   city: string,
//   state: string,
//   zip: string
// }



// const employeeFormConfig: FormConfig<Employee> = {
//   firstName: [''],
//   lastName: [''],
//   address: [addressFormConfig]
// }

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    address: new FormControl(''),
  })

  constructor(private readonly fb: FormBuilder) { }

  save() {
    console.log(this.form.value);
  }
}
