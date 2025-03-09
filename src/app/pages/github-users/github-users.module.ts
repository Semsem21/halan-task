import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GithubUsersComponent } from './github-users.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { routes } from './routes';



@NgModule({
  declarations: [
    GithubUsersComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class GithubUsersModule { }
