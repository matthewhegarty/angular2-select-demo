import {Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup} from '@angular/forms';

import {SELECT_DIRECTIVES} from 'angular2-select';

@Component({
    selector: 'angular2-select-demo-app',
    template: `
<h1>Angular 2 select demo app</h1>
<form
    [formGroup]="form">
	<ng-select
		[options]="options"
		[multiple]="multiple"
		[placeholder]="placeholder"
        formControlName="select"
		allowClear="true"
        name="value">
	</ng-select>
</form>
<div>
	Selected option id: {{form.value['select']}}
</div>
`,
    directives: [
        REACTIVE_FORM_DIRECTIVES,
		SELECT_DIRECTIVES
    ]
})

export class AppComponent implements OnInit {

    form: FormGroup;

    placeholder = 'Select user';
    multiple = false;
    options = [];
    selection: Array<string>;

    constructor() {

        let numOptions = 100;
        let opts = new Array(numOptions);

        for (let i = 0; i < numOptions; i++) {
            opts[i] = {
                value: i.toString(),
                label: i.toString()
            };
        }

        this.options = opts;
    }

    ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('select', new FormControl(''));
    }
}

