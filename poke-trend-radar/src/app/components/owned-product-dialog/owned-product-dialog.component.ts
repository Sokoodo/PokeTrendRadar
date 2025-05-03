
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MyProductDetail, OwnedProductService } from '../../services/owned-product-manager.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification-manager.service';

@Component({
  selector: 'owned-product-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './owned-product-dialog.component.html',
  styleUrl: './owned-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OwnedProductDialogComponent {
  private _productService = inject(OwnedProductService);
  private _fb = inject(FormBuilder);
  private _data = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  private _notificationService = inject(NotificationService);

  ownedProductForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<OwnedProductDialogComponent>) {
    this.ownedProductForm = this._fb.group({
      buy_price: [null, [Validators.required, Validators.min(0)]],
      buy_date: ['', [Validators.required]],
      buy_availability: [null, [Validators.required, Validators.min(0)]]
    });
  }

  saveProduct() {
    if (this.ownedProductForm.valid) {
      const ownedProduct: MyProductDetail = {
        product_id: this._data.productUrl,
        owned_qty: 1,
        buy_availability: this.ownedProductForm.get("buy_availability")?.value,
        buy_date: this.ownedProductForm.get("buy_date")?.value,
        buy_price: this.ownedProductForm.get("buy_price")?.value
      };
      this._productService.addOwnedProduct(ownedProduct).subscribe({
        next: response => {
          console.log('Response:', response);
          this.dialogRef.close(true);
          this._snackBar.open(
            'Owned Product Saved on DB',
            'Close',
            { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'successSnackbar' }
          );
          this._notificationService.addNotification({
            title: 'Add Owned Product',
            message: `SUCCESS: "${this._data.productName}" Added Succesfully!`,
            timestamp: new Date()
          })
        },
        error: error => {
          console.error('Error saving product:', error);
          console.log('Response Body:', error.error);
          this._snackBar.open(
            'Error: Product not Saved!',
            'Close',
            { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'errorSnackbar' }
          );
          this._notificationService.addNotification({
            title: 'Add Owned Product',
            message: `ERROR: "${this._data.productName}" not Added!`,
            timestamp: new Date()
          })
        }
      });

    } else {
      console.log('Form is invalid!');
    }
  }
}