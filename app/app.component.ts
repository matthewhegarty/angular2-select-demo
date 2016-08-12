import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'angular2-select-demo-app',
    template: `
<h1>Angular 2 select demo app</h1>
<form style="padding:18px;max-width:800px;"
    [formGroup]="form">
	
    <div style="margin:5px 0;font-weight:600;">Single select example</div>
    <ng-select
		[options]="options0"
		[multiple]="multiple0"
		placeholder="Select one"
        formControlName="selectSingle"
		allowClear="true">
	</ng-select>
    
    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{form.value['selectSingle']}}
    </div>

    <hr style="margin: 18px 0;">

    <div style="margin:5px 0;font-weight:600;">Multilpe select example</div>
	<ng-select
		[options]="options1"
		[multiple]="multiple1"
		placeholder="Select multiple"
        formControlName="selectMultiple">
	</ng-select>

    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{form.value['selectMultiple']}}
    </div>
</form>`
})

export class AppComponent implements OnInit {

    form: FormGroup;

    multiple0: boolean = false;
    multiple1: boolean = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
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

