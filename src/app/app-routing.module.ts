import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { 
    path: 'search', 
    loadChildren: () => import('./pages/github-users/github-users.module').then((m) => m.GithubUsersModule)
  },
  { 
    path: 'user/:username', 
    loadChildren: () => import('./pages/user-details/user-details.module').then((m) => m.UserDetailsModule)
  },
  { path: '**', redirectTo: 'search' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
