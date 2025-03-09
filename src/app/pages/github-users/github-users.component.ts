import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/interfaces/store';
import { GitHubUserBasic, UserSearchCriteria } from 'src/app/interfaces/user';
import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss']
})
export class GithubUsersComponent implements OnDestroy {
  users$: Observable<GitHubUserBasic[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  query$: Observable<string>;
  totalCount$: Observable<number>;
  perPage$: Observable<number>;
  currentPage$: Observable<number>;
  sort$: Observable<string | null>;
  order$: Observable<'asc' | 'desc' | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.users$ = this.store.select(UserSelectors.selectSearchResults);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
    this.error$ = this.store.select(UserSelectors.selectError);
    this.totalCount$ = this.store.select(UserSelectors.selectTotalCount);
    this.currentPage$ = this.store.select(UserSelectors.selectCurrentPage);
    this.perPage$ = this.store.select(UserSelectors.selectPerPage);
    this.query$ = this.store.select(UserSelectors.selectQuery);
    this.sort$ = this.store.select(state => state.users.sort);
    this.order$ = this.store.select(state => state.users.order);
  }

  onSearch(criteria: UserSearchCriteria): void {
    this.store.dispatch(UserActions.searchUsers({ criteria }));
  }

  onUserSelected(username: string): void {
    this.store.dispatch(UserActions.loadUserDetails({ username }));
    this.router.navigate(['/user', username]);
  }

  onPageChanged(criteria: UserSearchCriteria): void {
    this.store.dispatch(UserActions.searchUsers({ criteria }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}