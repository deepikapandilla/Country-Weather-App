import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Country } from '../services/country';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchTerm: string = '';

  constructor(private countryService: Country, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Fetch countries
    this.countryService.getCountries().subscribe({
      next: (data) => {
        console.log('Fetched countries', data.length);
        this.countries = data;
        this.filteredCountries = data;

        // Force Angular to update DOM after async fetch
        this.cd.detectChanges();
      },
      error: (err) => console.error('API error', err)
    });
  }

  filterCountries(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCountries = term
      ? this.countries.filter(c => c.name?.common.toLowerCase().includes(term))
      : this.countries;
  }
}
