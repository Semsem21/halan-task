import { createReducer, on } from '@ngrx/store';
import * as RepositoryActions from '../repositories/repository.actions';
import { RepositoryState } from 'src/app/interfaces/store';

export const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  sort: null,
  direction: null
};

export const repositoryReducer = createReducer(
  initialState,
  on(RepositoryActions.loadUserRepositories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RepositoryActions.loadUserRepositoriesSuccess, (state, { repositories, page, perPage, sort, direction }) => ({
    ...state,
    repositories,
    currentPage: page,
    perPage,
    totalCount: repositories.length,
    sort,
    direction,
    loading: false,
    error: null
  })),
  on(RepositoryActions.loadUserRepositoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(RepositoryActions.clearRepositories, state => ({
    ...state,
    repositories: []
  }))
)