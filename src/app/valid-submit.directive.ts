import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forOwn } from 'lodash';

@Directive({
  selector: '[appValidSubmit]'
})
export class ValidSubmitDirective {

  @Input() formGroup: FormGroup;

	// tslint:disable-next-line:no-output-rename
	@Output('validSubmit') submit = new EventEmitter();

	@HostListener('submit') onSubmit($event: Event) {
		forOwn(this.formGroup.controls, control => {
			control.markAsTouched();
		});
		if (!this.formGroup.valid) {
			return;
		}
		this.submit.emit($event);
	}

}

