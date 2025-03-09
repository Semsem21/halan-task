import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserSearchCriteria } from 'src/app/interfaces/user';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() users: any = [];
  @Input() loading = false;
  @Input() totalCount = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() query = '';
  @Input() sort: string | null = null;
  @Input() order: 'asc' | 'desc' | null = null;
  @Output() userSelected = new EventEmitter<string>();
  @Output() pageChanged = new EventEmitter<UserSearchCriteria>();

  displayedColumns: string[] = ['avatar', 'login', 'actions'];

  onUserClick(username: string) {
    this.userSelected.emit(username);
  }

  onPageChange(event: PageEvent) {
    const criteria: UserSearchCriteria = {
      query: this.query,
      page: event.pageIndex + 1,
      perPage: event.pageSize,
      sort: this.sort || undefined,
      order: this.order || undefined
    };
    this.pageChanged.emit(criteria);
  }
}