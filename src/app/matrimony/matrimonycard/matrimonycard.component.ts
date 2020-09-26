import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-matrimonycard',
  templateUrl: './matrimonycard.component.html',
  styleUrls: ['./matrimonycard.component.css'],
})
export class MatrimonycardComponent implements OnInit {
  @Input() matrimonyDetail: any;
  age: number;
  @Input() showUpdateButton: boolean;

  imagePath: String =
    'https://images.unsplash.com/photo-1598051384298-be3722a51e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (new Date(this.matrimonyDetail.birth_date).getFullYear() !== undefined) {
      this.age =
        new Date().getFullYear() -
        new Date(this.matrimonyDetail.birth_date).getFullYear();
    }
  }

  showUpdateForm() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userid: this.matrimonyDetail.userid,
        occupation: this.matrimonyDetail.occupation,
        user_summary: this.matrimonyDetail.user_summary,
        birth_date: this.matrimonyDetail.birth_date,
        gotra: this.matrimonyDetail.gotra,
        status: 'A',
        mode: 'UPDATE',
      },
    };

    this.router.navigate(['matrimony/home/registrationform'], navigationExtras);
  }
}
