import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RepositorySearchCriteria } from 'src/app/interfaces/repository';
import { GitHubUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  @Input() user!: GitHubUser;
  @Input() repositories: any = [];
  reposCurrentPage = 1;
  reposPageSize = 10;
  @Output() loadRepositories = new EventEmitter<RepositorySearchCriteria>();

  displayedColumns: string[] = ['name', 'description', 'language', 'stars', 'forks', 'updated', 'actions'];

  ngOnInit(): void {
    this.loadInitialRepositories();
  }

  loadInitialRepositories(): void {
    if (this.user) {
      const criteria: RepositorySearchCriteria = {
        username: this.user.login,
        page: 1,
        perPage: 10,
        sort: 'updated',
        direction: 'desc'
      };
      this.loadRepositories.emit(criteria);
    }
  }

  onPageChange(event: PageEvent): void {
    if (this.user) {
      const criteria: RepositorySearchCriteria = {
        username: this.user.login,
        page: event.pageIndex + 1,
        perPage: event.pageSize,
      };
      this.loadRepositories.emit(criteria);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
