import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit {
  @Input() imageList: string[];
  imageIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  scrollRight() {
    console.log('Showing next photo');
    if (this.imageIndex === this.imageList.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
  }

  scrollLeft() {
    if (this.imageIndex === 0) {
      this.imageIndex = this.imageList.length - 1;
    } else {
      this.imageIndex--;
    }
  }
}
