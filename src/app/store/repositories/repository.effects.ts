import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as RepositoryActions from '../repositories/repository.actions';
import { GitHubService } from 'src/app/services/github.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Injectable()
export class RepositoryEffects {
  constructor(
    private actions$: Actions,
    private gitHubService: GitHubService,
    private errorHandler: ErrorHandlerService
  ) { }

  loadUserRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoryActions.loadUserRepositories),
      mergeMap(({ criteria }) =>
        this.gitHubService.getUserRepositories(criteria).pipe(
          map(repositories => RepositoryActions.loadUserRepositoriesSuccess({
            repositories,
            page: criteria.page,
            perPage: criteria.perPage,
            sort: criteria.sort || null,
            direction: criteria.direction || null
          })),
          catchError(error => {
            this.errorHandler.handleError(error);
            return of(RepositoryActions.loadUserRepositoriesFailure({ error: error.message }));
          })
        )
      )
    )
  );
}