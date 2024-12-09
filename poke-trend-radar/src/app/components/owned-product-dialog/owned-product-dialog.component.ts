
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MyProductDetail, OwnedProductService } from '../../services/owned-product-manager.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'owned-product-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './owned-product-dialog.component.html',
  styleUrl: './owned-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnedProductDialogComponent {
  private _productService = inject(OwnedProductService);
  private _fb = inject(FormBuilder);

  ownedProductForm: FormGroup;
  data = inject(MAT_DIALOG_DATA);

  constructor(private dialogRef: MatDialogRef<OwnedProductDialogComponent>) {
    console.log(this.data)
    console.log(this.data.productUrl)
    this.ownedProductForm = this._fb.group({
      buy_price: [null, [Validators.required, Validators.min(0)]], // Client must input
      buy_date: ['', [Validators.required]], // Required, no default value
      buy_availability: [null, [Validators.required, Validators.min(0)]] // Client must input
    });
  }

  saveProduct() {
    if (this.ownedProductForm.valid) {
      const ownedProduct: MyProductDetail = {
        product_id: this.data.productUrl,
        owned_qty: 1,
        buy_availability: this.ownedProductForm.get("buy_availability")?.value,
        buy_date: this.ownedProductForm.get("buy_date")?.value,
        buy_price: this.ownedProductForm.get("buy_price")?.value
      };
      this._productService.addOwnedProduct(ownedProduct).subscribe({
        next: response => {
          console.log('Response:', response);
          this.dialogRef.close(true);
        },
        error: error => {
          console.error('Error saving product:', error);
          console.log('Response Body:', error.error);
        }
      });

    } else {
      console.log('Form is invalid!');
    }
  }
}