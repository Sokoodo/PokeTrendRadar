import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-section-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-section-page.component.html',
  styleUrl: './profile-section-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSectionPageComponent { }
