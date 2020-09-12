import {
  Component,
  OnInit,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log('Modal ngOnInit' + this.el);
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit(null);
  }
}
