import { Component, OnInit } from '@angular/core';
import { Resources } from './../resources';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  resources = Resources;
  constructor() { }

  ngOnInit(): void {
  }

}
