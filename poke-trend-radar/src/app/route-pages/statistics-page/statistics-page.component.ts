import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { StatisticsManagerService } from '../../services/statistics-manager.service';
import { takeUntil } from 'rxjs';
import { StatisticsChartComponent } from "../../components/statistics-chart/statistics-chart.component";
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [StatisticsChartComponent],
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent extends BaseComponent implements OnInit {
  private _statisticsManagerService = inject(StatisticsManagerService);

  totOwnedSinglesPrice: WritableSignal<number>;
  totBuoghtSinglesPrice: WritableSignal<number>;

  constructor() {
    super();
    this.totOwnedSinglesPrice = signal(0);
    this.totBuoghtSinglesPrice = signal(0);
  }

  ngOnInit(): void {
    this._statisticsManagerService.getSinglesTotalCurrentPrice().pipe(
      takeUntil(this.destroyed)
    ).subscribe((value: number) => {
      this.totOwnedSinglesPrice.set(value);
    });

    this._statisticsManagerService.getSinglesTotalBoughtPrice().pipe(
      takeUntil(this.destroyed)
    ).subscribe((value: number) => {
      this.totBuoghtSinglesPrice.set(value);
    });
  }

}
