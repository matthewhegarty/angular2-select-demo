import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'angular2-select-demo-app',
    template: `
<h1>Angular 2 select demo app</h1>

<form style="padding:18px;max-width:800px;"
    [formGroup]="formSingle">
	
    <div style="margin:5px 0;font-weight:600;">Single select example</div>
    <ng-select
		[options]="optionsSingle"
		[multiple]="multipleSingle"
		placeholder="Select one"
        formControlName="selectSingle"
		allowClear="true"
        (opened)="onSingleOpened()"
        (closed)="onSingleClosed()"
        (selected)="onSingleSelected($event)"
        (deselected)="onSingleDeselected($event)">
	</ng-select>
    
    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{formSingle.value['selectSingle']}}
    </div>

    <div>Events:</div>
    <pre #preSingle>{{logSingleString}}</pre>

</form>

<button
    (click)="onSingleResetClick()">Reset</button>

<hr style="margin: 18px 0;">

<form style="padding:18px;max-width:800px;"
    [formGroup]="formMultiple">

    <div style="margin:5px 0;font-weight:600;">Multilpe select example</div>
	<ng-select
		[options]="optionsMultiple"
		[multiple]="multipleMultiple"
		placeholder="Select multiple"
        formControlName="selectMultiple"
        (opened)="onMultipleOpened()"
        (closed)="onMultipleClosed()"
        (selected)="onMultipleSelected($event)"
        (deselected)="onMultipleDeselected($event)">
	</ng-select>

    <div style="margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;">
	    Selected option id: {{formMultiple.value['selectMultiple']}}
    </div>

    <div>Events:</div>
    <pre #preMultiple>{{logMultipleString}}</pre>
</form>
    
<button
    (click)="onMultipleResetClick()">Reset</button>
`})

export class AppComponent implements OnInit {

    formSingle: FormGroup;
    multipleSingle: boolean = false;
    optionsSingle: Array<any> = [];
    initialValueSingle: string = '22';

    formMultiple: FormGroup;
    multipleMultiple: boolean = true;
    optionsMultiple: Array<any> = [];
    initialValueMultiple: Array<string> = ['2', '22', '66'];
    
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

        this.optionsSingle = opts.slice(0);
        this.optionsMultiple = opts.slice(0);
    }

    ngOnInit() {
        this.formSingle = new FormGroup({});
        this.formSingle.addControl('selectSingle', 
                new FormControl(this.initialValueSingle));

        this.formMultiple = new FormGroup({});
        this.formMultiple.addControl('selectMultiple', 
                new FormControl(this.initialValueMultiple));
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

    onSingleResetClick() {
        this.formSingle.reset();
    }

    onMultipleResetClick() {
        this.formMultiple.reset();
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

