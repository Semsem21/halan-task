import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GitHubRepository, RepositorySearchCriteria } from 'src/app/interfaces/repository';
import { AppState } from 'src/app/interfaces/store';
import { GitHubUser } from 'src/app/interfaces/user';
import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';
import * as RepositoryActions from '../../store/repositories/repository.actions';
import * as RepositorySelectors from '../../store/repositories/repository.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<GitHubUser | null>;
  userLoading$: Observable<boolean>;
  userError$: Observable<string | null>;
  repositories$: Observable<GitHubRepository[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.user$ = this.store.select(UserSelectors.selectSelectedUser);
    this.userLoading$ = this.store.select(UserSelectors.selectLoading);
    this.userError$ = this.store.select(UserSelectors.selectError);
    this.repositories$ = this.store.select(RepositorySelectors.selectRepositories);
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const username = params['username'];
      if (username) {
        this.store.dispatch(UserActions.loadUserDetails({ username }));
      }
    });
  }

  onLoadRepositories(criteria: RepositorySearchCriteria): void {
    this.store.dispatch(RepositoryActions.loadUserRepositories({ criteria }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(UserActions.clearUserDetails());
    this.store.dispatch(RepositoryActions.clearRepositories());
  }
}
