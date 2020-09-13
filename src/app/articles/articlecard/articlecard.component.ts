import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-articlecard',
  templateUrl: './articlecard.component.html',
  styleUrls: ['./articlecard.component.css'],
})
export class ArticlecardComponent implements OnInit {
  @Input() articleDetail: any;
  @Input() showUpdateButton: boolean;
  _showModal: boolean;
  imagePath: String =
    'https://images.unsplash.com/photo-1598051384298-be3722a51e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showUpdateForm() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userid: this.articleDetail.userid,
        headline: this.articleDetail.headline,
        description: this.articleDetail.description,
        recordnumber: this.articleDetail.recordnumber,
        mode: 'UPDATE',
      },
    };

    this.router.navigate(['articles/home/registrationform'], navigationExtras);
  }

  showArticleDetails(articleDetail) {
    console.log('Showing article details...');
  }

  toggleModal() {
    this._showModal = !this._showModal;

    console.log('Modal flag is ' + this._showModal);
  }
}
