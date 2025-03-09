import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { AppState } from 'src/app/interfaces/store';
import { repositoryReducer } from './repositories/repository.reducer';

export const allReducers: ActionReducerMap<AppState> = {
  users: userReducer,
  repositories: repositoryReducer
};