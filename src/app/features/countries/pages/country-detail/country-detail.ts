import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country-detail',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail {
  private readonly route = inject(ActivatedRoute);

  readonly code = this.route.snapshot.paramMap.get('code');
}