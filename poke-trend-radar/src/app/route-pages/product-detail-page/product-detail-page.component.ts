import { Component } from '@angular/core';
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {
  prodUrl: string;

  constructor(private route: ActivatedRoute) {
    this.prodUrl = "";
  }

  ngOnInit(): void {
    this.prodUrl = this.route.snapshot.paramMap.get('id_url')!;
  }
}
