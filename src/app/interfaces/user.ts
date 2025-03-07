export interface UserSearchCriteria {
  query: string;
  page: number;
  perPage: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface GitHubUserSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUserBasic[];
}

export interface GitHubUserBasic {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  score: number;
  type: string;
}

export interface GitHubUser extends GitHubUserBasic {
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}






