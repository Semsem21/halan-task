import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/interfaces/store';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectSearchResults = createSelector(
  selectUserState,
  (state: UserState) => state.searchResults
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);

export const selectTotalCount = createSelector(
  selectUserState,
  (state: UserState) => state.totalCount
);

export const selectCurrentPage = createSelector(
  selectUserState,
  (state: UserState) => state.currentPage
);

export const selectPerPage = createSelector(
  selectUserState,
  (state: UserState) => state.perPage
);

export const selectQuery = createSelector(
  selectUserState,
  (state: UserState) => state.query
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);