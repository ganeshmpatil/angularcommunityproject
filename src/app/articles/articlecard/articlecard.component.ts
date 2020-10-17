import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-articlecard',
  templateUrl: './articlecard.component.html',
  styleUrls: ['./articlecard.component.css'],
})
export class ArticlecardComponent implements OnInit {
  @Input() articleDetail: any;
  @Input() showUpdateButton: boolean;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  _showModal: boolean;

  constructor(
    private router: Router,
    private articleService: ArticlesService,
    private notificationService: NotificationService
  ) {}

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

  delete() {
    this.articleDetail.status = 'C';
    this.articleService.updateArticles(this.articleDetail).subscribe(
      (response) => {
        this.notificationService.addSuccess(
          'Article Details deleted succesfully !!'
        );
        console.log(this.deleteEvent);
        this.deleteEvent.emit(null);
      },

      (error) => {
        this.notificationService.addError('Article Details delete failed !!');
        console.log(error);
      }
    );
  }
}
