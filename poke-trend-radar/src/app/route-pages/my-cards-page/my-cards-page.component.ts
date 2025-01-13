import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation-manager.service';
import { OwnedProductData, OwnedProductService } from '../../services/owned-product-manager.service';

@Component({
  selector: 'app-my-cards-page',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './my-cards-page.component.html',
  styleUrl: './my-cards-page.component.scss'
})
export class MyCardsPageComponent implements OnInit, OnDestroy {
  private _ownedProdService = inject(OwnedProductService);
  private _navService = inject(NavigationService);
  private _subs: Subscription[];

  ownedProducts: OwnedProductData[];
  loading: boolean;
  error: string;

  constructor() {
    this._subs = [];
    this.loading = true;
    this.ownedProducts = [];
    this.error = "";
  }

  ngOnInit(): void {
    this._subs.push(
      this._ownedProdService.getOwnedProductListFromApi().subscribe({
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
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }

  redirectCM(url: string) {
    this._navService.redirectCmPage(url, window);
  }

  navigateToDetails(url: string) {
    this._navService.navigateToDetails(url);
  }
}
