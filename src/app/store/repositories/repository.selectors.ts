import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RepositoryState } from 'src/app/interfaces/store';

export const selectRepositoryState = createFeatureSelector<RepositoryState>('repositories');

export const selectRepositories = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.repositories
);