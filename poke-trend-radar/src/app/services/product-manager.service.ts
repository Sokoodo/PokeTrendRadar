import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProductDetail {
    id_url: string;
    product_name: string;
    title: string;
    subtitle?: string;
    image: string;
    product_type: string;
    set_name?: string;
    card_number?: string;
    language: string;
    condition?: string;
    tcg_name: string;
    pokemon_species?: string;
    current_min_price: number;
    current_availability: number;
    historical_scrape_data: Array<{
        scrape_date: string;
        avg_price: number;
        min_price: number;
        max_price: number;
        detailed_availability: number;
        total_availability: number;
    }>;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = `${environment.apiBaseUrl}/api/products/product_detail`;

    constructor(private http: HttpClient) { }

    getProductDetailsFromApi(idUrl: string): Observable<ProductDetail> {
        const params = new HttpParams().set('id_url', idUrl);
        return this.http.get<ProductDetail>(this.apiUrl, { params });
    }
}
