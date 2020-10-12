import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  showAdditionalNavigationOptions: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(
      'Ng On init Count is ' +
        this.count +
        ' no. of pages ' +
        this.numberOfItemsPerPage
    );
    this.numberOfPages = Math.ceil(this.count / this.numberOfItemsPerPage);
    this.currentPageNumber = 1;
    if (this.numberOfPages > 5) {
      this.showAdditionalNavigationOptions = true;
      this.navigationEndPage = 5;
      this.navigationStartPage = 1;
      this.currentPaginationRangeCounter = 1;
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
    this.currentPaginationRangeCounter = this.currentPaginationRangeCounter + 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage <= this.count) {
      this.navigationEndPage = this.count;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    this.currentPageNumber = this.navigationStartPage;
    this.clickEvent.emit(this.currentPageNumber);
  }

  onPreviousSetClick() {
    this.currentPaginationRangeCounter = this.currentPaginationRangeCounter - 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage <= this.count) {
      this.navigationEndPage = this.count;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    if (this.navigationStartPage < 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.clickEvent.emit(this.currentPageNumber);
  }

  onLastClick() {
    this.currentPaginationRangeCounter = this.numberOfPages;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage <= this.count) {
      this.navigationEndPage = this.count;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    if (this.navigationStartPage < 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.clickEvent.emit(this.currentPageNumber);
  }

  onFirstClick() {
    this.currentPaginationRangeCounter = 1;
    this.navigationEndPage = this.currentPaginationRangeCounter * 5;
    if (this.navigationEndPage <= this.count) {
      this.navigationEndPage = this.count;
    }
    this.navigationStartPage = this.navigationEndPage - 4;
    if (this.navigationStartPage < 0) {
      this.navigationStartPage = 1;
    }
    this.currentPageNumber = this.navigationStartPage;
    this.clickEvent.emit(this.currentPageNumber);
  }
}
