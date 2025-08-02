import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsManagerService {

  private baseStatisticsApiUrl = `${environment.apiBaseUrl}/api/statistics`;
  private http = inject(HttpClient);

  getSinglesTotalCurrentPrice(): Observable<number> {
    const url = `${this.baseStatisticsApiUrl}/total_singles_current_price`
    return this.http.get<number>(url);
  }

  getSinglesTotalBoughtPrice() {
    const url = `${this.baseStatisticsApiUrl}/total_singles_bought_price`
    return this.http.get<number>(url);
  }
}
