import {Component, Input, OnInit , forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {RadioOption} from './radio.option';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[];
  value: any;
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(value) {
    this.value = value;
    this.onChange(this.value);
  }
  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.value = obj;
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {
     // this.value = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      throw new Error('Method not implemented.');
  }


}
