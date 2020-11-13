import { Component, OnInit } from '@angular/core';
import { Resources } from '../../resources';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  resources: Resources;

  constructor() { }

  ngOnInit(): void {
  }

}
