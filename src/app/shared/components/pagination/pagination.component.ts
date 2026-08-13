import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageNumber: number = 1;
  @Input() totalPages: number = 1;
  @Input() hasNextPage: boolean = false;
  @Input() hasPreviousPage: boolean = false;
  @Output() pageChange = new EventEmitter<number>();

  onPrevious() {
    if (this.hasPreviousPage) {
      this.pageChange.emit(this.pageNumber - 1);
    }
  }

  onNext() {
    if (this.hasNextPage) {
      this.pageChange.emit(this.pageNumber + 1);
    }
  }
}
