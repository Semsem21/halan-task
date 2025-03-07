import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private snackBar: MatSnackBar = inject(MatSnackBar)

  handleError(error: Error) {
    this.snackBar.open(error.message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
