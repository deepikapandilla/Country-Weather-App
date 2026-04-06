import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = 'c22467422ee25e5b4bd24102b94b9ae2'; // Get from https://openweathermap.org/api
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    console.log('Weather API URL:', url);
    return this.http.get<any>(url).pipe(
      catchError(err => {
        console.error('Weather API error details:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        return throwError(() => new Error('Unable to fetch weather data'));
      })
    );
  }
}