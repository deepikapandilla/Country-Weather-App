import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Country {
  // Add cca3 to the list so link generation in Home works (country.cca3 is defined).
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,currencies,cca3';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCountryByCode(code: string): Observable<any> {
    const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,population,currencies,cca3`;
    return this.http.get<any>(url);
  }
}


