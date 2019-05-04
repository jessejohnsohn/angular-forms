import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap } from 'rxjs/operators';

interface Address {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string
}

export const addressFormConfig = {
  address1: [''],
  address2: [''],
  city: [''],
  state: [''],
  zip: ['']
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressComponent),
    multi: true
  }]
})
export class AddressComponent implements ControlValueAccessor {

  form = this.fb.group(addressFormConfig);

  constructor(private readonly fb: FormBuilder) { this.form.valueChanges.subscribe(console.log)}

	writeValue(value: Address): void {
		if (value) {
			this.form.setValue(value, { emitEvent: false });
		}
	}

	// view --> model
	registerOnChange(fn: (value: Address) => void) {
		this.form.valueChanges.pipe(tap(console.log)).subscribe(fn);
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	onTouched: () => void = () => {};
}