import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-cards-page',
  standalone: true,
  imports: [],
  template: `<p>my-cards-page works!</p>`,
  styleUrl: './my-cards-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCardsPageComponent { }
