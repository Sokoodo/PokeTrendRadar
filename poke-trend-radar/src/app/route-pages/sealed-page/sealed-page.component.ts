import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { SealedDetail, SealedService } from '../../services/sealed-manager.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../services/navigation-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';
import { FiltersBarComponent } from '../../components/filters-bar/filters-bar.component';

@Component({
  selector: 'app-sealed-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule, MiddleClickDirective, FiltersBarComponent],
  templateUrl: './sealed-page.component.html',
  styleUrl: './sealed-page.component.scss'
})
export class SealedPageComponent implements OnInit, OnDestroy {
  private _sealedService = inject(SealedService);
  private _subs: Subscription[];

  navService = inject(NavigationService);

  sealedProducts: SealedDetail[];
  loading: boolean;
  error: string;

  constructor() {
    this.sealedProducts = [];
    this.error = "";
    this._subs = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this._subs.push(
      this._sealedService.getSealedListFromApi().subscribe({
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
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
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
