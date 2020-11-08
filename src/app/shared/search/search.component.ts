import { SearchService } from './../../search.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Resources } from '../../resources';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  @Input() searchEntity;
  @Output() searchResult: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() dropDownItems: [];

  constructor(
    private searchService: SearchService,
    private notificatioService: NotificationService
  ) {}

  searchForm = new FormGroup({
    searchTerm: new FormControl('', []),
    searchValue: new FormControl('', []),
  });

  doSearch() {
    const searchTerm = this.searchForm.get('searchTerm').value;
    const searchValue = this.searchForm.get('searchValue').value;
    console.log('Search Term' + searchTerm);
    console.log('Search Value' + searchValue);
    if (searchTerm  &&  searchValue) {
      this.searchService
        .search(searchTerm, searchValue, this.searchEntity)
        .subscribe((response) => {
          console.log(response);
          this.searchResult.emit(response);
        });
    } else {
      this.notificatioService.addError('Please enter the search criteria');
    }
  }

  onCancelClick(){
    this.cancel.emit();
  }

  ngOnInit(): void {
  }
}
