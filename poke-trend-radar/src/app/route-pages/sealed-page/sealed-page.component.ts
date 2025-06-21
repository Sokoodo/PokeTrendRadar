import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SealedDetail, SealedService } from '../../services/sealed-manager.service';
import { MatCardModule } from '@angular/material/card';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../services/navigation-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';
import { FiltersBarComponent } from '../../components/filters-bar/filters-bar.component';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-sealed-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule, MiddleClickDirective, FiltersBarComponent],
  templateUrl: './sealed-page.component.html',
  styleUrl: './sealed-page.component.scss'
})
export class SealedPageComponent extends BaseComponent implements OnInit {
  private _sealedService = inject(SealedService);

  navService = inject(NavigationService);

  sealedProducts: SealedDetail[];
  loading: boolean;
  error: string;

  constructor() {
    super();
    this.sealedProducts = [];
    this.error = "";
    this.loading = true;
  }

  ngOnInit(): void {
    this._sealedService.getSealedListFromApi().pipe(
      takeUntil(this.destroyed)
    ).subscribe({
      next: (data) => {
        this.sealedProducts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching product details', err);
        this.error = 'An error occurred while fetching the product details.';
        this.loading = false;
      }
    })
  }

  redirectCM(url: string) {
    this.navService.redirectOnUrlPage(url, window);
  }

  navigateToDetails(url: string) {
    this.navService.navigateToDetails(url);
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  handleFilter(filter: string): void {
    console.log('Applying filter:', filter);
  }
}
