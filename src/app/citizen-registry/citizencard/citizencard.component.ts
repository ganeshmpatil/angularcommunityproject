import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-citizencard',
  templateUrl: './citizencard.component.html',
  styleUrls: ['./citizencard.component.css'],
})
export class CitizencardComponent implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() fatherName: string;
  @Input() mobileNumber: string;
  @Input() image: any;
  @Input() address: string;
  @Input() emailId: string;
  @Input() villageName: string;
  @Input() education: string;

  constructor() {}

  ngOnInit(): void {}
}
