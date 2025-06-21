import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { StatisticsManagerService } from '../../services/statistics-manager.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-section-page.component.html',
  styleUrl: './profile-section-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent {
  private _statisticsManagerService = inject(StatisticsManagerService);
  totOwnedSinglesPrice: WritableSignal<number>;

  constructor() {
    this.totOwnedSinglesPrice = signal(0);
  }

  getTotalSingles() {
    this._statisticsManagerService.getSinglesListFromApi()
      .pipe(first())
      .subscribe((value: number) => {
        this.totOwnedSinglesPrice.set(value);
      });
  }
}
