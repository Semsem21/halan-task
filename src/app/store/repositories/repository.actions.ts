import { createAction, props } from '@ngrx/store';
import { GitHubRepository, RepositorySearchCriteria } from 'src/app/interfaces/repository';

export const loadUserRepositories = createAction(
  '[Repository] Load User Repositories',
  props<{ criteria: RepositorySearchCriteria }>()
);

export const loadUserRepositoriesSuccess = createAction(
  '[Repository] Load User Repositories Success',
  props<{
    repositories: GitHubRepository[],
    page: number,
    perPage: number,
    sort: string | null,
    direction: 'asc' | 'desc' | null
  }>()
);

export const loadUserRepositoriesFailure = createAction(
  '[Repository] Load User Repositories Failure',
  props<{ error: string }>()
);

export const clearRepositories = createAction(
  '[Repository] Clear Repositories'
);