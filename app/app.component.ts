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
		[options]="options0"
		[multiple]="multiple0"
		placeholder="Select one"
        formControlName="selectSingle"
		allowClear="true">
	</ng-select>
    
    <div>
	    Selected option id: {{form.value['selectSingle']}}
    </div>
    <hr>

	<ng-select
		[options]="options1"
		[multiple]="multiple1"
		placeholder="Select multiple"
        formControlName="selectMultiple">
	</ng-select>

    <div>
	    Selected option id: {{form.value['selectMultiple']}}
    </div>
</form>
`,
    directives: [
        REACTIVE_FORM_DIRECTIVES,
		SELECT_DIRECTIVES
    ]
})

export class AppComponent implements OnInit {

    form: FormGroup;

    multiple0: boolean = false;
    multiple1: boolean = true;
    options: Array<any> = [];
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

        this.options0 = opts.slice(0);
        this.options1 = opts.slice(0);
    }

    ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('selectSingle', new FormControl(''));
        this.form.addControl('selectMultiple', new FormControl(''));
    }
}

