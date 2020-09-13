import {
  Component,
  OnInit,
  Output,
  Input,
  ElementRef,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();
  @Input() showModal: boolean;
  closeResult: string;
  @ViewChild('mymodal', { static: true }) template: ElementRef;
  constructor(private el: ElementRef, private modalService: NgbModal) {}

  ngOnInit() {
    console.log('Modal ngOnInit' + this.el);
    document.body.appendChild(this.el.nativeElement);
    if (this.showModal) {
      console.log('Loading modal screen');
      this.modalService
        .open(this.template, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.dismiss.emit();
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.dismiss.emit();
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onDismissClick() {
    this.dismiss.emit(null);
  }
}
