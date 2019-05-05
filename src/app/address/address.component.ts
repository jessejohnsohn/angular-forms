import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, NG_VALUE_ACCESSOR, Validators, NgControl, FormControl, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormConfig } from '../app.component';

export interface Address {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string
}

export const ADDRESS_FORM_CONFIG: FormConfig<Address> = {
  address1: ['', Validators.required],
  address2: ['', Validators.required],
  city: ['', Validators.required],
  state: ['', Validators.required],
  zip: ['']
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AddressComponent),
    multi: true
  }
  ],
})
export class AddressComponent implements ControlValueAccessor {

  touched = false;

  form = this.fb.group(ADDRESS_FORM_CONFIG);

  constructor(private readonly fb: FormBuilder) { }

	writeValue(value: Address): void {
		if (value) {
			this.form.setValue(value, { emitEvent: false });
		}
	}

	registerOnChange(fn: (value: Address) => void) {
		this.form.valueChanges.subscribe(fn);
	}

	registerOnTouched(fn: () => void) {
    // This is never triggered
		this.onTouched = () => this.touched = true;
	}

  validate(): ValidationErrors {
    return this.collectErrors(this.form);
  }

	onTouched: () => void = () => {};

  private collectErrors(ctrl: FormGroup): ValidationErrors {
    return Object.keys(ctrl.controls).reduce((a, k) => ctrl.controls[k].errors ? a.concat(ctrl.controls[k].errors) : a, []) as ValidationErrors;
  }
}