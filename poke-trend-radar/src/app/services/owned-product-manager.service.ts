import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MyProductDetail {
    product_id: string;
    owned_qty: number;
    buy_price: number;
    buy_date: string;
    buy_availability: number;
}

export interface OwnedProductData {
    id_url: string;
    title: string;
    image: string;
    set_name: string;
    language: string;
    current_min_price: number;
    current_availability: number;
    in_my_collection: boolean;
    owned_entries_number: number;
}
@Injectable({
    providedIn: 'root',
})
export class OwnedProductService {
    private apiAddOwnedUrl = `${environment.apiBaseUrl}/api/owned_products/add_owned_products`;
    private getApiUrl = `${environment.apiBaseUrl}/api/owned_products/get_owned_products`;

    constructor(private http: HttpClient) { }

    addOwnedProduct(product: MyProductDetail): Observable<any> {
        return this.http.post<any>(this.apiAddOwnedUrl, product, { responseType: 'json' }).pipe(
            catchError((error) => {
                console.error('API Error:', error);
                return throwError(() => error);
            })
        );
    }

    getOwnedProductListFromApi(): Observable<OwnedProductData[]> {
        return this.http.get<OwnedProductData[]>(this.getApiUrl).pipe(
            catchError((error) => {
                console.error('API Error:', error);
                return throwError(() => error);
            })
        );
    }
}
