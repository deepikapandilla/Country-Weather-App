import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Country } from '../services/country';
import { WeatherDetails } from '../weather-details/weather-details';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherDetails],
  templateUrl: './country-details.html',
  styleUrls: ['./country-details.css'],
})
export class CountryDetails implements OnInit {
  country: any = null;
  loading = true;
  errorMessage = '';
  showWeather = false; 

  constructor(
    private countryService: Country,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');

      if (!code) {
        this.errorMessage = 'Invalid country code';
        this.loading = false;
        this.country = null;
        this.cd.detectChanges();
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.country = null;
      this.showWeather = false;
      this.cd.detectChanges();
      
      this.countryService.getCountryByCode(code).subscribe({
        next: (data) => {
          this.country = Array.isArray(data) ? data[0] : data;
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load country';
          this.loading = false;
          this.cd.detectChanges();
        },
      });
    });
  }

  toggleWeather() {
    this.showWeather = !this.showWeather;
  }
}