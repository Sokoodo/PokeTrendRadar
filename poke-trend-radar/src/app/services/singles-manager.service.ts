import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SinglesDetail {
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
export class SinglesService {

    private apiUrl = `${environment.apiBaseUrl}/api/products/singlesPokemon`;

    constructor(private http: HttpClient) { }

    getSinglesListFromApi(): Observable<SinglesDetail[]> {
        return this.http.get<SinglesDetail[]>(this.apiUrl);
    }
}
