import {Component, OnInit, ViewChild} from '@angular/core';
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
		allowClear="true"
        (opened)="onSingleOpened()"
        (closed)="onSingleClosed()"
        (selected)="onSingleSelected($event)"
        (deselected)="onSingleDeselected($event)">
	</ng-select>
    
    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{form.value['selectSingle']}}
    </div>

    <div>Events:</div>
    <pre #preSingle>{{logSingleString}}</pre>

    <hr style="margin: 18px 0;">

    <div style="margin:5px 0;font-weight:600;">Multilpe select example</div>
	<ng-select
		[options]="options1"
		[multiple]="multiple1"
		placeholder="Select multiple"
        formControlName="selectMultiple"
        (opened)="onMultipleOpened()"
        (closed)="onMultipleClosed()"
        (selected)="onMultipleSelected($event)"
        (deselected)="onMultipleDeselected($event)">
	</ng-select>

    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{form.value['selectMultiple']}}
    </div>

    <div>Events:</div>
    <pre #preMultiple>{{logMultipleString}}</pre>
</form>`
})

export class AppComponent implements OnInit {

    form: FormGroup;

    multiple0: boolean = false;
    multiple1: boolean = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
    selection: Array<string>;

    @ViewChild('preSingle') preSingle;
    @ViewChild('preMultiple') preMultiple;

    logSingleString: string = '';
    logMultipleString: string = '';

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

    onSingleOpened() {
        this.logSingle('- opened');
    }

    onSingleClosed() {
        this.logSingle('- closed');
    }

    onSingleSelected(item) {
        this.logSingle('- selected (value: ' + item.value  + ', label:' + 
                       item.label + ')');
    }

    onSingleDeselected(item) {
        this.logSingle('- deselected (value: ' + item.value  + ', label:' + 
                       item.label + ')');
    }

    onMultipleOpened() {
        this.logMultiple('- opened');
    }

    onMultipleClosed() {
        this.logMultiple('- closed');
    }

    onMultipleSelected(item) {
        this.logMultiple('- selected (value: ' + item.value  + ', label:' + 
                       item.label + ')');
    }

    onMultipleDeselected(item) {
        this.logMultiple('- deselected (value: ' + item.value  + ', label:' + 
                       item.label + ')');
    }

    private logSingle(msg: string) {
        this.logSingleString += msg + '\n';
        
        // Let change detection do its work before scrolling to div bottom.
        setTimeout(() => {
            this.scrollToBottom(this.preSingle.nativeElement);
        });
    }

    private logMultiple(msg: string) {
        this.logMultipleString += msg + '\n';

        // Let change detection do its work before scrolling to div bottom.
        setTimeout(() => {
            this.scrollToBottom(this.preMultiple.nativeElement);
        });
    }

    private scrollToBottom(elem) {
        elem.scrollTop = elem.scrollHeight;
    }
}

