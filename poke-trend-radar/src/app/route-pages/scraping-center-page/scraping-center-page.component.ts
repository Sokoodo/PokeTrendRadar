import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../../services/notification-manager.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiltersManagerService } from '../../services/filters-manager.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseComponent } from '../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'scraping-center-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './scraping-center-page.component.html',
  styleUrl: './scraping-center-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ScrapingCenterPageComponent extends BaseComponent {
  private _notificationService = inject(NotificationService);
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);
  private _filtersService = inject(FiltersManagerService);

  scrapingUrl: string;

  constructor() {
    super();
    this.scrapingUrl = '';
  }

  confirmScraping(filtersType: string) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to start scraping ${filtersType}? It may take a while...`
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroyed)
    ).subscribe((result: boolean) => {
      console.log(result)
      if (result == true) {
        this.startScraping(filtersType);
      }
    });
  }

  startScraping(filtersType: string) {
    // this._filtersService.startLoading();
    // this._filtersService.startScraping(filtersType).subscribe({
    //   next: (data) => {
    //     console.log(data)
    //     this._filtersService.stopLoading();
    //     this._snackBar.open(
    //       `${filtersType} Scraping Completed!`,
    //       'Close',
    //       { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'successSnackbar' }
    //     );
    //     this._notificationService.addNotification({
    //       title: 'Scraping Status',
    //       message: `SUCCESS: "${filtersType}" Scraping Completed!`,
    //       timestamp: new Date()
    //     })
    //   },
    //   error: (err) => {
    //     console.error('Error fetching product details', err);
    //     this._filtersService.stopLoading();
    //     this._snackBar.open(
    //       `Error scraping ${filtersType} details`,
    //       'Close',
    //       { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'errorSnackbar' }
    //     );
    //     this._notificationService.addNotification({
    //       title: 'Scraping Status',
    //       message: `ERROR: "${filtersType}" Scraping NOT Succesful!`,
    //       timestamp: new Date()
    //     })
    //   }
    // });
  }

  onScrapeProduct() {
  }
}
