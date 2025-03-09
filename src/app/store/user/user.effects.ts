import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GitHubService } from 'src/app/services/github.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private gitHubService: GitHubService,
    private errorHandler: ErrorHandlerService
  ) { }

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      mergeMap(({ criteria }) =>
        this.gitHubService.searchUsers(criteria).pipe(
          map(response => UserActions.searchUsersSuccess({
            users: response.items,
            totalCount: response.total_count,
            page: criteria.page,
            perPage: criteria.perPage,
            query: criteria.query,
            sort: criteria.sort || null,
            order: criteria.order || null
          })),
          catchError(error => {
            this.errorHandler.handleError(error);
            return of(UserActions.searchUsersFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserDetails),
      mergeMap(({ username }) =>
        this.gitHubService.getUserDetails(username).pipe(
          map(user => UserActions.loadUserDetailsSuccess({ user })),
          catchError(error => {
            this.errorHandler.handleError(error);
            return of(UserActions.loadUserDetailsFailure({ error: error.message }));
          })
        )
      )
    )
  );
}