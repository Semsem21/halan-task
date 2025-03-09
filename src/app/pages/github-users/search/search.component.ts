import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSearchCriteria } from 'src/app/interfaces/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() loading = false;
  @Input() initialQuery: any = '';
  @Output() search = new EventEmitter<UserSearchCriteria>();

  searchForm!: FormGroup;
  sortOptions = [
    { value: '', label: 'Best Match' },
    { value: 'followers', label: 'Followers' },
    { value: 'repositories', label: 'Repositories' },
    { value: 'joined', label: 'Date Joined' }
  ];
  orderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      query: [this.initialQuery, [Validators.required, Validators.minLength(1)]],
      sort: [''],
      order: ['desc']
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const criteria: UserSearchCriteria = {
        query: formValue.query,
        page: 1,
        perPage: 10,
        sort: formValue.sort || undefined,
        order: formValue.order || undefined
      };
      this.search.emit(criteria);
    }
  }
}