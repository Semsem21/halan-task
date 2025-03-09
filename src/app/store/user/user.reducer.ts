import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from 'src/app/interfaces/store';

export const initialState: UserState = {
  searchResults: [],
  selectedUser: null,
  totalCount: 0,
  loading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  query: '',
  sort: null,
  order: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.searchUsers, (state, { criteria }) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.searchUsersSuccess, (state, { users, totalCount, page, perPage, query, sort, order }) => ({
    ...state,
    searchResults: users,
    totalCount,
    currentPage: page,
    perPage,
    query,
    sort,
    order,
    loading: false,
    error: null
  })),
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.loadUserDetails, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserDetailsSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
    error: null
  })),
  on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.clearUserDetails, state => ({
    ...state,
    selectedUser: null
  }))
);