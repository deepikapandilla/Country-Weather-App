import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../services/weather';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-details.html',
  styleUrls: ['./weather-details.css']
})
export class WeatherDetails implements OnInit {
  @Input() capital: string = '';
  weather: any = null;
  loading = true;
  errorMessage = '';

  constructor(private weatherService: Weather, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('WeatherDetails ngOnInit, capital:', this.capital);

    if (!this.capital) {
      this.errorMessage = 'No capital provided';
      this.loading = false;
      this.cd.detectChanges();
      return;
    }

    console.log('Fetching weather for:', this.capital);
    this.weatherService.getWeather(this.capital).subscribe({
      next: (data) => {
        console.log('Weather data received:', data);
        this.weather = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        };
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Weather fetch error:', err);
        this.errorMessage = 'Unable to fetch weather: ' + (err.error?.message || err.message || 'Unknown error');
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }
}