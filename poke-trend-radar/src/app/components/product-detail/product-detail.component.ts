import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductDetail, ProductService } from '../../services/product-manager.service';
import { ProductChartComponent } from "../product-chart/product-chart.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductChartComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  @Input("inputProductUrl") inputProductUrl?: string;

  private _productService = inject(ProductService);
  private _titleService = inject(Title);

  productDetails?: ProductDetail;
  productUrl: string;
  loading: boolean;
  error: string;

  constructor() {
    this.productUrl = "";
    this.error = "";
    this.loading = true;
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
      },
      error: (err) => {
        console.error('Error fetching product details', err);
        this.error = 'An error occurred while fetching the product details.';
        this.loading = false;
      }
    });
  }
}
