import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { UserDetailsComponent } from './user-details.component';
import { InfoComponent } from './info/info.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UserDetailsComponent,
    InfoComponent,
    RepositoriesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserDetailsModule { }
