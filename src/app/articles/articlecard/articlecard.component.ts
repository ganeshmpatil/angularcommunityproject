import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articlecard',
  templateUrl: './articlecard.component.html',
  styleUrls: ['./articlecard.component.css'],
})
export class ArticlecardComponent implements OnInit {
  @Input() articleDetail: any;
  @Input() showUpdateButton: boolean;
  imagePath: String =
    'https://images.unsplash.com/photo-1598051384298-be3722a51e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

  constructor() {}

  ngOnInit(): void {}
}
