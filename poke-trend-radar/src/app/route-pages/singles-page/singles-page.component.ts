import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';
import { SinglesDetail, SinglesService } from '../../services/singles-manager.service';
import { NavigationService } from '../../services/navigation-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';
import { FiltersBarComponent } from "../../components/filters-bar/filters-bar.component";

@Component({
  selector: 'app-singles-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule, MiddleClickDirective, FiltersBarComponent],
  templateUrl: './singles-page.component.html',
  styleUrl: './singles-page.component.scss'
})
export class SinglesPageComponent implements OnInit, OnDestroy {
  private _singlesService = inject(SinglesService);
  private _navService = inject(NavigationService);
  private _subs: Subscription[];

  singlesProducts: SinglesDetail[];
  loading: boolean;
  error: string;

  constructor() {
    this.singlesProducts = [];
    this.error = "";
    this._subs = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this._subs.push(
      this._singlesService.getSinglesListFromApi().subscribe({
        next: (data) => {
          this.singlesProducts = data;
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
    this._navService.redirectOnUrlPage(url, window);
  }

  navigateToDetails(url: string) {
    this._navService.navigateToDetails(url);
  }

  handleSearch(query: string): void {
    console.log('Searching for:', query);
  }

  handleFilter(filter: string): void {
    console.log('Applying filter:', filter);
  }
}
