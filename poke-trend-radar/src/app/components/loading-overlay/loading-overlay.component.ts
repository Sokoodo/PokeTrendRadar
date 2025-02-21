import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FiltersManagerService } from '../../services/filters-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LoadingOverlayComponent {

  private _filtersService = inject(FiltersManagerService);

  loading$: Observable<boolean>;

  constructor() {
    this.loading$ = this._filtersService.loading$;
  }

}
