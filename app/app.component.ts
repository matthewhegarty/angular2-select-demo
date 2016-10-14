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
        #singleSelectComponent
		[options]="optionsSingle"
		[multiple]="multipleSingle"
		placeholder="Select one"
        formControlName="selectSingle"
		[allowClear]="allowClear"
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

    <div style="margin:5px 0;font-weight:600;">Multiple select example</div>
	<ng-select
        #multipleSelectComponent
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
<button
    (click)="onMultipleSetOptions1Click()">Set options 0, 1, A, B</button>
`})

export class AppComponent implements OnInit {

    formSingle: FormGroup;
    multipleSingle: boolean = false;
    optionsSingle: Array<any> = [];
    alternativeOptionsSingle: Array<any> = [];
    initialValueSingle: string = '22';
    allowClear: boolean = true;

    formMultiple: FormGroup;
    multipleMultiple: boolean = true;
    optionsMultiple: Array<any> = [];
    alternativeOptionsMultiple: Array<any> = [];
    initialValueMultiple: Array<string> = ['0', '2', '22', '66'];
    
    opts;
    alternativeOpts;

    @ViewChild('singleSelectComponent') singleSelectComponent;
    @ViewChild('multipleSelectComponent') multipleSelectComponent;

    @ViewChild('preSingle') preSingle;
    @ViewChild('preMultiple') preMultiple;

    logSingleString: string = '';
    logMultipleString: string = '';

    constructor() {

        let numOptions = 100;
        this.opts = new Array(numOptions);

        for (let i = 0; i < numOptions; i++) {
            this.opts[i] = {
                value: i.toString(),
                label: i.toString()
            };
        }

        this.alternativeOpts = [{
            value: '0',
            label: '0'
        }, {
            value: '1',
            label: '1'
        }, {
            value: 'A',
            label: 'A'
        }, {
            value: 'B',
            label: 'B'
        }]

        this.optionsSingle = this.opts.slice(0);
        this.optionsMultiple = this.opts.slice(0);
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

    onMultipleSetOptions1Click() {
        this.optionsMultiple = this.alternativeOpts.slice(0);
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

