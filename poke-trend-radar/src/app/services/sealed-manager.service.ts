import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SealedDetail {
    id_url: string;
    title: string;
    image: string;
    language: string;
    current_min_price: number;
    current_availability: number;
}

@Injectable({
    providedIn: 'root'
})
export class SealedService {

    private apiUrl = `${environment.apiBaseUrl}/api/products/sealedPokemon`;

    constructor(private http: HttpClient) { }

    getSealedListFromApi(): Observable<SealedDetail[]> {
        return this.http.get<SealedDetail[]>(this.apiUrl);
    }
}
