import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavigationService } from '../../services/navigation-manager.service';
import { OwnedProductData, OwnedProductService } from '../../services/owned-product-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';
import { BaseComponent } from '../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-cards-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule, MiddleClickDirective],
  templateUrl: './my-cards-page.component.html',
  styleUrl: './my-cards-page.component.scss'
})
export class MyCardsPageComponent extends BaseComponent implements OnInit {
  private _ownedProdService = inject(OwnedProductService);

  navService = inject(NavigationService);

  ownedProducts: OwnedProductData[];
  loading: boolean;
  error: string;

  constructor() {
    super();
    this.loading = true;
    this.ownedProducts = [];
    this.error = "";
  }

  ngOnInit(): void {
    this._ownedProdService.getOwnedProductListFromApi().pipe(
      takeUntil(this.destroyed)
    ).subscribe({
      next: (data) => {
        this.ownedProducts = data;
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
}
