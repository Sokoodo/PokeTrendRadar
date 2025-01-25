import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductDetail, ProductService } from '../../services/product-manager.service';
import { ProductChartComponent } from "../product-chart/product-chart.component";
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OwnedProductDialogComponent } from '../owned-product-dialog/owned-product-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../services/navigation-manager.service';
import { MiddleClickDirective } from '../../directives/middleClick.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductChartComponent, MatDialogModule, MatButtonModule, MiddleClickDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  @Input("inputProductUrl") inputProductUrl?: string;

  readonly dialog = inject(MatDialog);
  private _productService = inject(ProductService);
  private _titleService = inject(Title);
  _navService = inject(NavigationService);

  totalAvailability: number;
  productDetails?: ProductDetail;
  productUrl: string;
  loading: boolean;
  error: string;

  constructor() {
    this.productUrl = "";
    this.error = "";
    this.loading = true;
    this.totalAvailability = 0;
  }

  ngOnInit(): void {
    if (this.inputProductUrl != undefined) {
      this.productUrl = this.inputProductUrl;
      this.getProductDetails(this.productUrl);
      this._titleService.setTitle(this.productDetails?.title ?? "PokeTrendRadar")
    }
  }

  getProductDetails(productUrl: string): void {
    this._productService.getProductDetailsFromApi(productUrl).subscribe({
      next: (data) => {
        this.productDetails = data;
        this.loading = false;
        this.totalAvailability = data.historical_scrape_data[data.historical_scrape_data.length - 1].total_availability;
      },
      error: (err) => {
        console.error('Error fetching product details', err);
        this.error = 'An error occurred while fetching the product details.';
        this.loading = false;
      }
    });
  }

  openAddOwnedDialog() {
    this.dialog.open(OwnedProductDialogComponent, {
      data: {
        productUrl: this.productUrl
      }
    });
  }


  redirectOnCardmarket() {
    if (this.productDetails != undefined) {
      this._navService.redirectOnUrlPage(this.productDetails.id_url, window);
    }
  }
}
