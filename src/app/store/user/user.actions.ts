import { createAction, props } from '@ngrx/store';
import { GitHubUser, GitHubUserBasic, UserSearchCriteria } from 'src/app/interfaces/user';

export const searchUsers = createAction(
  '[User] Search Users',
  props<{ criteria: UserSearchCriteria }>()
);

export const searchUsersSuccess = createAction(
  '[User] Search Users Success',
  props<{
    users: GitHubUserBasic[],
    totalCount: number,
    page: number,
    perPage: number,
    query: string,
    sort: string | null,
    order: 'asc' | 'desc' | null
  }>()
);

export const searchUsersFailure = createAction(
  '[User] Search Users Failure',
  props<{ error: string }>()
);

export const loadUserDetails = createAction(
  '[User] Load User Details',
  props<{ username: string }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User] Load User Details Success',
  props<{ user: GitHubUser }>()
);

export const loadUserDetailsFailure = createAction(
  '[User] Load User Details Failure',
  props<{ error: string }>()
);

export const clearUserDetails = createAction(
  '[User] Clear User Details'
);