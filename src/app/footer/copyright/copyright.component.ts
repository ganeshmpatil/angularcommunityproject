import { Component, OnInit } from '@angular/core';
import { Resources } from '../../resources';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  resources = Resources;
  constructor() { }

  ngOnInit(): void {
  }

}
