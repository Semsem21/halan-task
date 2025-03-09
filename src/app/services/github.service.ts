import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GitHubUser, GitHubUserSearchResult, UserSearchCriteria } from '../interfaces/user';
import { GitHubRepository, RepositorySearchCriteria } from '../interfaces/repository';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private apiBaseUrl = 'https://api.github.com';
  http: HttpClient = inject(HttpClient);

  searchUsers(criteria: UserSearchCriteria): Observable<GitHubUserSearchResult> {
    let params = new HttpParams()
      .set('q', criteria.query)
      .set('page', criteria.page.toString())
      .set('per_page', criteria.perPage.toString());

    if (criteria.sort) {
      params = params.set('sort', criteria.sort);
    }

    if (criteria.order) {
      params = params.set('order', criteria.order);
    }

    return this.http.get<GitHubUserSearchResult>(`${this.apiBaseUrl}/search/users`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserDetails(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.apiBaseUrl}/users/${username}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserRepositories(criteria: RepositorySearchCriteria): Observable<GitHubRepository[]> {
    let params = new HttpParams()
      .set('page', criteria.page.toString())
      .set('per_page', criteria.perPage.toString())
      .set('sort', criteria.sort);

    return this.http.get<GitHubRepository[]>(`${this.apiBaseUrl}/users/${criteria.username}/repos`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 403 && error.headers.get('X-RateLimit-Remaining') === '0') {
        errorMessage = 'GitHub API Rate limit Exceeded. Please Try Again later.';
      } else if (error.status === 404) {
        errorMessage = 'Resource Not Found.';
      } else if (error.status === 422) {
        errorMessage = 'Invalid User Name.';
      } else {
        errorMessage;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
