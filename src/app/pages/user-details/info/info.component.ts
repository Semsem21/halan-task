import { Component, Input } from '@angular/core';
import { GitHubUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() user!: GitHubUser;

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
