import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { takeUntil } from 'rxjs';
import { SinglesDetail, SinglesService } from '../../services/singles-manager.service';
import { NavigationService } from '../../services/navigation-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';
import { FiltersBarComponent } from "../../components/filters-bar/filters-bar.component";
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-singles-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule, MiddleClickDirective, FiltersBarComponent],
  templateUrl: './singles-page.component.html',
  styleUrl: './singles-page.component.scss'
})
export class SinglesPageComponent extends BaseComponent implements OnInit {
  private _singlesService = inject(SinglesService);

  navService = inject(NavigationService);

  singlesProducts: SinglesDetail[];
  loading: boolean;
  error: string;

  constructor() {
    super();
    this.singlesProducts = [];
    this.error = "";
    this.loading = true;
  }

  ngOnInit(): void {
    this._singlesService.getSinglesListFromApi().pipe(
      takeUntil(this.destroyed)
    ).subscribe({
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
