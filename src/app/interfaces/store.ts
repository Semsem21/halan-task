import { GitHubRepository } from "./repository";
import { GitHubUser, GitHubUserBasic } from "./user";

export interface AppState {
  users: UserState;
  repositories: RepositoryState;
}

export interface UserState {
  searchResults: GitHubUserBasic[];
  selectedUser: GitHubUser | null;
  totalCount: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: number;
  query: string;
  sort: string | null;
  order: 'asc' | 'desc' | null;
}

export interface RepositoryState {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: number;
  totalCount: number;
  sort: string | null;
  direction: 'asc' | 'desc' | null;
}