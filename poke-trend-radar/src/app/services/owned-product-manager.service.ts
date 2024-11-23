import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OwnedProductDetail {
    product_id: string;
    owned_qty: number;
    buy_price: number;
    buy_date: string;
    buy_availability: number;
}

@Injectable({
    providedIn: 'root',
})
export class OwnedProductService {
    private apiUrl = environment.apiBaseUrl+'/api/owned_products';

    constructor(private http: HttpClient) { }

    addOwnedProduct(product: OwnedProductDetail): Observable<any> {
        return this.http.post<any>(this.apiUrl, product, { responseType: 'json' }).pipe(
            catchError((error) => {
                console.error('API Error:', error);
                return throwError(() => error);
            })
        );
    }
}
