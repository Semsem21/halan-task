import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {
  @Input() error: string | null = null;
}
