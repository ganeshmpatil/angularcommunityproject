import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() newLine: boolean;


  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }
}
