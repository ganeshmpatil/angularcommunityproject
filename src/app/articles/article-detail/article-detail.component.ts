import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() articleDetail: any;
  imagePath: String =
    'https://images.unsplash.com/photo-1598051384298-be3722a51e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';
  constructor() {}

  ngOnInit(): void {}
}
