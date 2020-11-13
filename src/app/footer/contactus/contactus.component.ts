import { Component, OnInit } from '@angular/core';
import { Resources } from '../../resources';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  resources = Resources;

  constructor() { }

  ngOnInit(): void {

  }

}
