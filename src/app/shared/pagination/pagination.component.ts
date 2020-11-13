import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources } from '../../resources';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() count: any;
  @Input() numberOfItemsPerPage: any;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  pagesIterator: any[];
  numberOfPages: any;
  navigationStartPage: any;
  navigationEndPage: any;
  currentPageNumber: any;
  currentPaginationRangeCounter: any;
  showAdditionalNavigationOptions = false;
  showNextButton  = true;
  showPrevButton  = true;
  isLastPageReached = false;
  resources = Resources;

  constructor() {}

  ngOnInit(): void {
    this.numberOfPages = Math.ceil(this.count / this.numberOfItemsPerPage);
    console.log(
      'Ng On init Count is ' +
        this.count +
        ' no. of items per page ' +
        this.numberOfItemsPerPage +
        ' no of pages ' +
        this.numberOfPages
    );
    this.currentPageNumber = 1;
    if (this.numberOfPages > 5) {
      this.showAdditionalNavigationOptions = true;
      this.navigationEndPage = 5;
      this.navigationStartPage = 1;
      this.currentPaginationRangeCounter = 1;
      this.pagesIterator = Array.from(
        Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
      );
    } else {
      this.navigationEndPage = this.numberOfPages;
      this.navigationStartPage = 1;
      this.currentPaginationRangeCounter = 1;
      console.log(
        'In pagination constructor number of pages :- ' +
          this.numberOfPages +
          ' Navigation End Page :- ' +
          this.navigationEndPage +
          ' Navigation Start page :- ' +
          this.navigationStartPage
      );
      this.pagesIterator = Array.from(
        Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
      );
    }
  }

  emitClickEvent(pageNumber) {
    this.clickEvent.emit(pageNumber);
    this.currentPageNumber = pageNumber;
  }

  onNextSetClick() {
    if (this.isLastPageReached) {
      return;
    }
    this.showPrevButton = true;
    this.navigationStartPage = this.currentPaginationRangeCounter * 5 + 1;
    this.currentPaginationRangeCounter = this.currentPaginationRangeCounter + 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage > this.numberOfPages) {
      this.navigationEndPage = this.numberOfPages;
      this.isLastPageReached = true;
    }
    // this.navigationStartPage = this.navigationEndPage - 4;
    this.currentPageNumber = this.navigationStartPage;
    console.log('onNextSetClick ' + this.currentPageNumber);
    this.clickEvent.emit(this.currentPageNumber);
    this.pagesIterator = Array.from(
      Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
    );
    console.log(
      'In pagination constructor number of pages :- ' +
        this.numberOfPages +
        ' Navigation End Page :- ' +
        this.navigationEndPage +
        ' Navigation Start page :- ' +
        this.navigationStartPage
    );
  }

  onPreviousSetClick() {
    if (this.currentPaginationRangeCounter === 1) {
      return;
    }
    this.showNextButton = true;
    this.isLastPageReached = false;
    this.currentPaginationRangeCounter = this.currentPaginationRangeCounter - 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage > this.numberOfPages) {
      this.navigationEndPage = this.numberOfPages;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    if (this.navigationStartPage <= 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.pagesIterator = Array.from(
      Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
    );
    this.clickEvent.emit(this.currentPageNumber);
  }

  onLastClick() {
    this.isLastPageReached = true;
    this.showNextButton = false;
    this.showPrevButton = true;
    this.currentPaginationRangeCounter = Math.ceil(
      this.count / this.numberOfItemsPerPage / 5
    );
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage > this.numberOfPages) {
      this.navigationEndPage = this.numberOfPages;
    }
    this.navigationStartPage = (this.currentPaginationRangeCounter - 1) * 5 + 1;
    if (this.navigationStartPage < 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.pagesIterator = Array.from(
      Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
    );
    this.clickEvent.emit(this.currentPageNumber);

    console.log(
      'onLastClick number of pages :- ' +
        this.numberOfPages +
        ' Navigation End Page :- ' +
        this.navigationEndPage +
        ' Navigation Start page :- ' +
        this.navigationStartPage +
        ' currentPaginationRangeCounter : ' +
        this.currentPaginationRangeCounter
    );
  }

  onFirstClick() {
    this.isLastPageReached = false;
    this.showNextButton = true;
    this.showPrevButton = false;
    this.currentPaginationRangeCounter = 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage > this.numberOfPages) {
      this.navigationEndPage = this.numberOfPages;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    if (this.navigationStartPage < 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.pagesIterator = Array.from(
      Array(this.navigationEndPage - (this.navigationStartPage - 1)).keys()
    );
    this.clickEvent.emit(this.currentPageNumber);
    console.log(
      'onFirstClick number of pages :- ' +
        this.numberOfPages +
        ' Navigation End Page :- ' +
        this.navigationEndPage +
        ' Navigation Start page :- ' +
        this.navigationStartPage +
        ' currentPaginationRangeCounter : ' +
        this.currentPaginationRangeCounter
    );
  }
}
